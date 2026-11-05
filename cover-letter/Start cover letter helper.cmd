@echo off
rem Starts the local helper for cover-letter.html and opens the page.
rem Installs Node.js first with winget (built into Windows 11) when it's missing.
cd /d "%~dp0"

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
pause
