#!/usr/bin/env node
// Local helper for cover-letter.html.
//
// A web page can't start programs, so this serves the page at
// http://127.0.0.1:4817/ and runs Claude Code for its "Fill from a listing"
// button. Each run is a new headless `claude -p` process that keeps no session
// on disk, loads none of your customisations (--safe-mode), and can only use
// WebSearch and WebFetch.
//
// It also registers a pedro-cover-letter:// link, so the page's "Start the
// helper" button can start it later without a terminal.
//
// Usage: node cover-letter-helper.mjs [--no-open] [--uninstall]
// Env:   COVER_LETTER_PORT (default 4817), CLAUDE_PATH (skip the search for Claude Code)

import { execFile, execFileSync, spawn } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  realpathSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { createServer } from "node:http";
import { homedir, platform, tmpdir } from "node:os";
import { delimiter, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HOST = "127.0.0.1";
const PORT = Number(process.env.COVER_LETTER_PORT) || 4817;
const SELF = fileURLToPath(import.meta.url);
const PAGE = join(dirname(SELF), "cover-letter.html");
const SCHEME = "pedro-cover-letter";
const IS_WINDOWS = platform() === "win32";
const TOOLS = "WebSearch,WebFetch";
const RUN_TIMEOUT_MS = 8 * 60_000;
const MAX_BODY_BYTES = 20 * 1024 * 1024;
const IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];
const ORIGINS = [`http://${HOST}:${PORT}`, `http://localhost:${PORT}`];

// --- Finding Claude Code -----------------------------------------------------

const isFile = (path) => {
  try {
    return statSync(path).isFile();
  } catch {
    return false;
  }
};

const isDir = (path) => {
  try {
    return statSync(path).isDirectory();
  } catch {
    return false;
  }
};

/**
 * npm installs a `claude.cmd` shim on Windows. Node can't spawn .cmd files
 * without a shell, and a shell would mangle the JSON arguments, so run what
 * the shim points at instead: a .js file through this Node, or an .exe.
 */
function toCommand(file) {
  if (!/\.(cmd|bat)$/i.test(file))
    return { path: file, command: file, prefix: [] };
  const shim = readFileSync(file, "utf8");
  const target = shim.match(/%~?dp0%?\\([^"\r\n]+?\.(?:c?js|mjs|exe))/i)?.[1];
  if (!target) return null;
  const full = join(dirname(file), target);
  if (!isFile(full)) return null;
  return /\.exe$/i.test(full)
    ? { path: file, command: full, prefix: [] }
    : { path: file, command: process.execPath, prefix: [full] };
}

function findClaude() {
  if (process.env.CLAUDE_PATH) {
    return isFile(process.env.CLAUDE_PATH)
      ? toCommand(process.env.CLAUDE_PATH)
      : null;
  }
  const home = homedir();
  const names = IS_WINDOWS ? ["claude.exe", "claude.cmd"] : ["claude"];
  const dirs = [
    ...(process.env.PATH ?? "").split(delimiter).filter(Boolean),
    join(home, ".local", "bin"),
    join(home, ".claude", "local"),
    ...(IS_WINDOWS
      ? [join(process.env.APPDATA ?? join(home, "AppData", "Roaming"), "npm")]
      : [
          "/usr/local/bin",
          "/opt/homebrew/bin",
          join(home, ".npm-global", "bin"),
        ]),
  ];
  for (const dir of dirs) {
    for (const name of names) {
      const file = join(dir, name);
      if (isFile(file)) {
        const command = toCommand(file);
        if (command) return command;
      }
    }
  }
  return null;
}

/**
 * Claude Code keeps each login in a config directory: ~/.claude by default,
 * or another one picked with CLAUDE_CONFIG_DIR (e.g. ~/.claude-personal).
 * "default" means: run without CLAUDE_CONFIG_DIR.
 */
function configDirs() {
  const home = homedir();
  const dirs = new Set(["default"]);
  const add = (dir) => {
    const full = resolve(dir);
    if (full !== join(home, ".claude") && isDir(full)) dirs.add(full);
  };
  if (process.env.CLAUDE_CONFIG_DIR) add(process.env.CLAUDE_CONFIG_DIR);
  for (const name of readdirSync(home)) {
    if (!/^\.claude[-_.]/.test(name)) continue;
    const dir = join(home, name);
    const looksLikeConfig = [
      "settings.json",
      ".credentials.json",
      "projects",
    ].some((entry) => existsSync(join(dir, entry)));
    if (isDir(dir) && looksLikeConfig) add(dir);
  }
  return [...dirs];
}

function childEnv(account) {
  const env = { ...process.env };
  // Started from inside a Claude Code session, these would leak into the child.
  delete env.CLAUDECODE;
  delete env.CLAUDE_CODE_ENTRYPOINT;
  if (account === "default") delete env.CLAUDE_CONFIG_DIR;
  else env.CLAUDE_CONFIG_DIR = account;
  return env;
}

function runQuiet(claude, args, env) {
  return new Promise((done) => {
    execFile(
      claude.command,
      [...claude.prefix, ...args],
      { env, timeout: 30_000, windowsHide: true, cwd: tmpdir() },
      (error, stdout) => done({ ok: !error, stdout: String(stdout ?? "") }),
    );
  });
}

async function accountStatus(claude, account) {
  const { stdout } = await runQuiet(
    claude,
    ["auth", "status"],
    childEnv(account),
  );
  let info = {};
  try {
    info = JSON.parse(stdout);
  } catch {
    // Older versions print text; treat as unknown.
  }
  return {
    id: account,
    dir:
      info.configDirectory ??
      (account === "default" ? join(homedir(), ".claude") : account),
    loggedIn: info.loggedIn === true,
    email: info.email ?? "",
    org: info.orgName ?? "",
    plan:
      info.subscriptionType ?? (info.loggedIn ? (info.authMethod ?? "") : ""),
  };
}

async function status() {
  const claude = findClaude();
  if (!claude) return { claude: null, accounts: [] };
  const [version, accounts] = await Promise.all([
    runQuiet(claude, ["--version"], childEnv("default")),
    Promise.all(configDirs().map((account) => accountStatus(claude, account))),
  ]);
  return {
    claude: {
      path: claude.path,
      version: version.stdout.trim().split(/\s/)[0] ?? "",
    },
    accounts,
  };
}

// --- One autofill run ---------------------------------------------------------

function describeTool(block) {
  const input = block.input ?? {};
  if (block.name === "WebSearch") return `Searching: ${input.query ?? ""}`;
  if (block.name === "WebFetch") {
    try {
      const url = new URL(input.url);
      return `Reading ${url.hostname}${url.pathname === "/" ? "" : url.pathname}`;
    } catch {
      return "Reading a page";
    }
  }
  return null;
}

function autofill(request, response) {
  const send = (message) => response.write(`${JSON.stringify(message)}\n`);
  const fail = (message) => {
    send({ type: "error", message });
    response.end();
  };

  const claude = findClaude();
  if (!claude) return fail("Claude Code wasn't found on this computer.");
  if (!configDirs().includes(request.account))
    return fail("That Claude Code account isn't on this computer.");

  const content = [];
  if (request.image) {
    content.push({
      type: "image",
      source: {
        type: "base64",
        media_type: request.image.mediaType,
        data: request.image.data,
      },
    });
  }
  content.push({ type: "text", text: request.prompt });

  const child = spawn(
    claude.command,
    [
      ...claude.prefix,
      "-p",
      "--safe-mode",
      "--no-session-persistence",
      "--input-format",
      "stream-json",
      "--output-format",
      "stream-json",
      "--verbose",
      "--tools",
      TOOLS,
      "--allowedTools",
      TOOLS,
      "--permission-prompts",
      "none",
      "--strict-mcp-config",
      "--json-schema",
      JSON.stringify(request.schema),
    ],
    { env: childEnv(request.account), cwd: tmpdir(), windowsHide: true },
  );

  let finished = false;
  let stderr = "";
  let buffer = "";
  const finish = (message) => {
    if (finished) return;
    finished = true;
    clearTimeout(timer);
    send(message);
    response.end();
    child.kill();
  };
  const timer = setTimeout(
    () =>
      finish({
        type: "error",
        message: "Claude took longer than 8 minutes, so the run was stopped.",
      }),
    RUN_TIMEOUT_MS,
  );

  // The page closed the request (Cancel, or the tab went away).
  response.on("close", () => {
    if (!finished) {
      finished = true;
      clearTimeout(timer);
      child.kill();
    }
  });

  child.stdout.setEncoding("utf8");
  child.stdout.on("data", (chunk) => {
    buffer += chunk;
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      let event;
      try {
        event = JSON.parse(line);
      } catch {
        continue;
      }
      if (event.type === "assistant") {
        for (const block of event.message?.content ?? []) {
          const text = block.type === "tool_use" ? describeTool(block) : null;
          if (text) send({ type: "progress", text });
        }
      } else if (event.type === "result") {
        if (event.is_error || event.subtype !== "success") {
          finish({
            type: "error",
            message: event.result || `Claude Code stopped (${event.subtype}).`,
          });
        } else if (event.structured_output) {
          finish({
            type: "result",
            data: event.structured_output,
            costUsd: event.total_cost_usd,
          });
        } else {
          finish({
            type: "error",
            message: "Claude finished without filling in the fields.",
          });
        }
      }
    }
  });
  child.stderr.setEncoding("utf8");
  child.stderr.on("data", (chunk) => {
    stderr = (stderr + chunk).slice(-2000);
  });
  child.on("error", (error) =>
    finish({
      type: "error",
      message: `Couldn't start Claude Code: ${error.message}`,
    }),
  );
  child.on("close", (code) =>
    finish({
      type: "error",
      message:
        stderr.trim() || `Claude Code exited (code ${code}) without an answer.`,
    }),
  );

  child.stdin.end(
    `${JSON.stringify({ type: "user", message: { role: "user", content } })}\n`,
  );
  send({ type: "progress", text: "Started a new Claude Code session" });
}

function parseRequest(body) {
  const request = JSON.parse(body);
  if (typeof request.account !== "string") throw new Error("Missing account.");
  if (typeof request.prompt !== "string" || !request.prompt.trim())
    throw new Error("Missing prompt.");
  if (!request.schema || typeof request.schema !== "object")
    throw new Error("Missing schema.");
  if (request.image) {
    const { mediaType, data } = request.image;
    if (
      !IMAGE_TYPES.includes(mediaType) ||
      typeof data !== "string" ||
      !/^[A-Za-z0-9+/=]+$/.test(data)
    ) {
      throw new Error("The screenshot must be a PNG, JPEG, WebP or GIF image.");
    }
  }
  return request;
}

// --- HTTP ----------------------------------------------------------------------

/**
 * Only this page may use the helper. The Host check blocks DNS rebinding, and
 * the Origin check stops other websites from starting Claude runs.
 */
function allowed(req) {
  const hosts = ORIGINS.map((origin) => origin.slice("http://".length));
  if (!hosts.includes(req.headers.host ?? "")) return false;
  return req.method === "GET" || ORIGINS.includes(req.headers.origin ?? "");
}

function json(res, code, value) {
  res.writeHead(code, {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(value));
}

const server = createServer((req, res) => {
  if (!allowed(req)) return json(res, 403, { error: "Forbidden" });
  const path = new URL(req.url ?? "/", `http://${HOST}`).pathname;

  if (req.method === "GET" && (path === "/" || path === "/index.html")) {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    });
    return res.end(readFileSync(PAGE));
  }
  if (req.method === "GET" && path === "/api/ping")
    return json(res, 200, { app: "cover-letter-helper" });
  if (req.method === "GET" && path === "/api/status") {
    return status().then(
      (value) => json(res, 200, value),
      (error) => json(res, 500, { error: error.message }),
    );
  }
  if (req.method === "POST" && path === "/api/autofill") {
    let body = "";
    let size = 0;
    req.setEncoding("utf8");
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        json(res, 413, { error: "The listing is too large." });
        req.destroy();
      } else body += chunk;
    });
    req.on("end", () => {
      if (res.writableEnded) return;
      let request;
      try {
        request = parseRequest(body);
      } catch (error) {
        return json(res, 400, { error: error.message });
      }
      res.writeHead(200, {
        "Content-Type": "application/x-ndjson",
        "Cache-Control": "no-store",
      });
      autofill(request, res);
    });
    return;
  }
  json(res, 404, { error: "Not found" });
});

function openBrowser(url) {
  if (process.argv.includes("--no-open")) return;
  const [command, args] = IS_WINDOWS
    ? ["cmd", ["/c", "start", "", url]]
    : platform() === "darwin"
      ? ["open", [url]]
      : ["xdg-open", [url]];
  spawn(command, args, { detached: true, stdio: "ignore", windowsHide: true })
    .on("error", () => {})
    .unref();
}

// --- The page's "Start the helper" button ---------------------------------------
// Registers pedro-cover-letter:// for this user. The browser hands such links to
// the OS, which runs this file in a terminal window (close it to stop the helper).

const DESKTOP_FILE = join(
  process.env.XDG_DATA_HOME || join(homedir(), ".local", "share"),
  "applications",
  `${SCHEME}-helper.desktop`,
);
const REG_KEY = `HKCU\\Software\\Classes\\${SCHEME}`;

function readText(file) {
  try {
    return readFileSync(file, "utf8");
  } catch {
    return "";
  }
}

/** Returns true when it changed something. */
function registerScheme() {
  // The real binary: version managers like fnm put a temporary symlink on PATH.
  const node = realpathSync(process.execPath);
  if (IS_WINDOWS) {
    const command = `"${node}" "${SELF}" --no-open "%1"`;
    let current = "";
    try {
      current = execFileSync(
        "reg",
        ["query", `${REG_KEY}\\shell\\open\\command`, "/ve"],
        // Not registered yet on a first run: reg prints an error, which is expected.
        { encoding: "utf8", windowsHide: true, stdio: ["ignore", "pipe", "ignore"] },
      );
    } catch {}
    if (current.includes(command)) return false;
    const reg = (...args) =>
      execFileSync("reg", ["add", ...args, "/f"], {
        stdio: "ignore",
        windowsHide: true,
      });
    reg(REG_KEY, "/ve", "/d", "URL:Cover letter helper");
    reg(REG_KEY, "/v", "URL Protocol", "/d", "");
    reg(`${REG_KEY}\\shell\\open\\command`, "/ve", "/d", command);
    return true;
  }
  if (platform() !== "linux") return false;
  // Desktop-entry quoting rules get hairy for these characters; skip rather than break.
  if (/["`$\\]/.test(node + SELF))
    throw new Error(
      "this folder's path has characters a desktop entry can't hold",
    );
  const quote = (path) => `"${path.replaceAll("%", "%%")}"`;
  const entry = [
    "[Desktop Entry]",
    "Type=Application",
    "Name=Cover letter helper",
    "Comment=Starts the helper for cover-letter.html",
    `Exec=${quote(node)} ${quote(SELF)} --no-open %u`,
    "Terminal=true",
    "NoDisplay=true",
    `MimeType=x-scheme-handler/${SCHEME};`,
    "",
  ].join("\n");
  if (readText(DESKTOP_FILE) === entry) return false;
  mkdirSync(dirname(DESKTOP_FILE), { recursive: true });
  writeFileSync(DESKTOP_FILE, entry);
  execFileSync(
    "xdg-mime",
    ["default", `${SCHEME}-helper.desktop`, `x-scheme-handler/${SCHEME}`],
    { stdio: "ignore" },
  );
  return true;
}

function unregisterScheme() {
  if (IS_WINDOWS) {
    try {
      execFileSync("reg", ["delete", REG_KEY, "/f"], {
        stdio: "ignore",
        windowsHide: true,
      });
    } catch {}
  } else {
    rmSync(DESKTOP_FILE, { force: true });
  }
  console.log(
    "Removed the page's Start button link. Start the helper with its launcher from now on.",
  );
}

if (process.argv.includes("--uninstall")) {
  unregisterScheme();
  process.exit(0);
}

const url = `http://${HOST}:${PORT}/`;

server.on("error", async (error) => {
  if (error.code !== "EADDRINUSE") throw error;
  // Already running (e.g. started twice): just open the page.
  try {
    const ping = await fetch(`${url}api/ping`).then((r) => r.json());
    if (ping.app === "cover-letter-helper") {
      console.log(`The helper is already running at ${url}`);
      openBrowser(url);
      process.exit(0);
    }
  } catch {}
  console.error(
    `Port ${PORT} is in use by another program. Set COVER_LETTER_PORT to another port and try again.`,
  );
  process.exit(1);
});

server.listen(PORT, HOST, () => {
  console.log(`Cover letter helper running at ${url}`);
  console.log(
    "Keep this window open while you use the page. Close it, or press Ctrl+C, to stop it.",
  );
  try {
    if (registerScheme())
      console.log(
        'Set up the page\'s "Start the helper" button: next time, the page can start this helper by itself.',
      );
  } catch (error) {
    console.warn(
      `Couldn't set up the page's "Start the helper" button (${error.message}). Use the launcher instead.`,
    );
  }
  openBrowser(url);
});
