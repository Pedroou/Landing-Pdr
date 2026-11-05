#!/bin/sh
# Starts the local helper for cover-letter.html and opens the page.
cd "$(dirname "$0")" || exit 1
# Node installed through fnm is only on PATH in shells that loaded it.
if ! command -v node >/dev/null 2>&1 && command -v fnm >/dev/null 2>&1; then
  eval "$(fnm env)"
fi
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is needed to run the helper. Install it from https://nodejs.org and run this again."
  exit 1
fi
exec node cover-letter-helper.mjs "$@"
