@echo off
REM ===============================================
REM Quick Setup Script for TF2 Steam Bot
REM ===============================================

setlocal enabledelayedexpansion

echo.
echo ========================================
echo   TF2 Steam Bot - Quick Setup
echo ========================================
echo.

REM Check Node.js installation
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed!
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js found
echo.

REM Install dependencies
echo [*] Installing dependencies...
call npm install
if errorlevel 1 (
    echo [ERROR] Installation failed
    pause
    exit /b 1
)

echo [OK] Dependencies installed
echo.

REM Create .env template
if not exist ".env" (
    echo [*] Creating .env template...
    (
        echo # Discord Bot Configuration
        echo DISCORD_TOKEN=your_discord_bot_token_here
        echo.
        echo # Steam Account Configuration
        echo STEAM_USERNAME=your_steam_username
        echo STEAM_PASSWORD=your_steam_password
        echo STEAM_ACCOUNT_NAME=your_account_name
        echo.
        echo # Binance API Configuration
        echo BINANCE_API_KEY=your_binance_api_key
        echo BINANCE_API_SECRET=your_binance_api_secret
        echo.
        echo # Bot Configuration
        echo ADMIN_ID=your_discord_admin_id
        echo BOT_PREFIX=!
        echo.
        echo # Database
        echo DB_PATH=./data/bot.db
        echo.
        echo # Logging
        echo LOG_LEVEL=info
        echo NODE_ENV=production
    ) > .env
    echo [OK] .env template created. Please configure it!
    echo.
)

REM Create data directory
if not exist "data" mkdir data

REM Create logs directory
if not exist "logs" mkdir logs

echo [OK] Setup completed successfully!
echo.
echo Next steps:
echo 1. Open .env file and add your configuration
echo 2. Run run-bot.bat to start the bot
echo.
pause
