@echo off
REM ===============================================
REM TF2 Steam Bot - Windows Launcher
REM ===============================================
REM This batch file sets up and runs the TF2 Steam Bot
REM on Windows systems

setlocal enabledelayedexpansion

echo.
echo ========================================
echo   TF2 Mann Co. Key Trading Bot
echo   Windows Launcher v1.0
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo.
    echo Please download and install Node.js from:
    echo https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js is installed
node --version

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm is not installed or not in PATH
    echo.
    pause
    exit /b 1
)

echo [OK] npm is ready
echo.

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo [*] Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install dependencies
        pause
        exit /b 1
    )
    echo [OK] Dependencies installed successfully
    echo.
)

REM Check if .env file exists
if not exist ".env" (
    echo [!] .env file not found
    echo.
    echo Please create a .env file with the following content:
    echo.
    echo DISCORD_TOKEN=your_discord_bot_token
    echo STEAM_USERNAME=your_steam_username
    echo STEAM_PASSWORD=your_steam_password
    echo BINANCE_API_KEY=your_binance_api_key
    echo BINANCE_API_SECRET=your_binance_api_secret
    echo ADMIN_ID=your_discord_admin_id
    echo.
    echo After creating the file, run this script again.
    pause
    exit /b 1
)

echo [OK] Configuration file found
echo.

REM Start the bot
echo [*] Starting TF2 Steam Bot...
echo ========================================
echo.

call npm start

REM If the bot exits, prompt the user
echo.
echo Bot has stopped running.
pause
