@echo off
rem Starts the local helper for cover-letter.html and opens the page.
rem Installs Node.js first with winget (built into Windows 11) when it's missing.
cd /d "%~dp0"

rem Opened from inside the .zip: Windows copies only this file to a temp folder.
if not exist "%~dp0cover-letter-helper.mjs" (
  echo This was opened from inside the .zip file, so the other files aren't next to it.
  echo.
  echo Close this window, right-click the .zip and choose "Extract All",
  echo then double-click "Start cover letter helper.cmd" in the extracted folder.
  echo.
  pause
  exit /b 1
)

set "NODE=node"
where node >nul 2>nul
if not errorlevel 1 goto run

rem Installed earlier, but this window's PATH predates it.
set "NODE=%ProgramFiles%\nodejs\node.exe"
if exist "%NODE%" goto run

echo Node.js isn't installed yet, so it's being installed now. This takes a minute or two.
echo If Windows asks for permission, click Yes.
echo.
winget install --id OpenJS.NodeJS.LTS --exact --source winget --silent --accept-package-agreements --accept-source-agreements
echo.
if exist "%NODE%" goto run

echo Node.js couldn't be installed automatically.
echo Install the LTS version from https://nodejs.org and double-click this file again.
pause
exit /b 1

:run
"%NODE%" "%~dp0cover-letter-helper.mjs"
rem Keep the window open only when something went wrong, so the message stays readable.
if errorlevel 1 pause
