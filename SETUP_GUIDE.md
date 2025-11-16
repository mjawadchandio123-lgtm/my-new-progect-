# TF2 Steam Bot Configuration Guide

## Quick Setup for Windows

### Step 1: Download Node.js
1. Go to https://nodejs.org/
2. Download the LTS version (recommended)
3. Run the installer and follow the steps
4. Restart your computer

### Step 2: Extract Bot Files
1. Extract the bot folder to a location (e.g., C:\TF2Bot)
2. Open Command Prompt in the bot folder (Shift + Right Click → Open PowerShell/CMD)

### Step 3: Run Setup
Double-click `setup.bat` OR run in Command Prompt:
```batch
setup.bat
```

This will:
- Check for Node.js installation
- Install all dependencies
- Create the `.env` configuration file template

### Step 4: Configure .env File
1. Open `.env` file in Notepad
2. Fill in your configuration:

```env
# Discord Bot Configuration
DISCORD_TOKEN=your_discord_bot_token_here

# Steam Account Configuration
STEAM_USERNAME=your_steam_username
STEAM_PASSWORD=your_steam_password
STEAM_ACCOUNT_NAME=your_account_name

# Binance API Configuration
BINANCE_API_KEY=your_binance_api_key
BINANCE_API_SECRET=your_binance_api_secret

# Bot Settings
ADMIN_ID=your_discord_user_id
BOT_PREFIX=!
```

### Step 5: Get Your Configuration Values

#### Discord Token
1. Go to https://discord.com/developers/applications
2. Click "New Application"
3. Go to "Bot" tab
4. Click "Add Bot"
5. Copy the token and paste in `.env`

#### Your Discord ID
1. Enable Developer Mode in Discord (User Settings → Advanced → Developer Mode)
2. Right-click your username and select "Copy User ID"
3. Paste in `.env`

#### Binance API Keys
1. Go to https://www.binance.com/
2. Create an account or login
3. Go to API Management (Settings → API Management)
4. Create a new API key
5. Paste both API Key and API Secret in `.env`

#### Steam Credentials
1. Use your Steam username and password
2. Note: Use an account dedicated to the bot for security

### Step 6: Run the Bot
Double-click `run-bot.bat` OR run in Command Prompt:
```batch
run-bot.bat
```

The bot should now be running! You'll see:
```
✅ Database initialized
✅ Command handlers loaded
✅ Bot logged in as YourBotName#0000
🎮 Ready to process TF2 key trades!
```

## Troubleshooting

### "Node.js is not installed"
- Install Node.js from https://nodejs.org/
- Restart your computer after installation

### "npm install fails"
- Check your internet connection
- Delete the `node_modules` folder
- Delete `package-lock.json`
- Run `setup.bat` again

### Bot won't start
- Verify all required fields in `.env` are filled
- Check that Discord token is valid
- Make sure bot has permissions in your Discord server
- Look for error messages in the console

### "DISCORD_TOKEN is missing"
- You forgot to add your Discord token in `.env`
- Get one from https://discord.com/developers/applications

## Bot Permissions

Add these permissions to your bot in Discord Developer Portal:
- Send Messages
- Embed Links
- Read Message History
- Add Reactions

## File Structure

```
your_bot_folder/
├── src/                    - Bot source code
│   ├── index.js           - Main entry point
│   ├── commands/          - All bot commands
│   ├── config/            - Configuration files
│   ├── database/          - Database operations
│   ├── handlers/          - Event handlers
│   ├── languages/         - Multi-language support
│   └── utils/             - Utility functions
├── data/                   - Database and data files
├── logs/                   - Log files
├── .env                    - Configuration (DO NOT SHARE!)
├── package.json            - Dependencies list
├── run-bot.bat            - Windows launcher
├── setup.bat              - Windows setup
└── README.md              - Main documentation
```

## Security Tips

⚠️ **IMPORTANT:**
- Never share your `.env` file
- Never share your API keys or passwords
- Don't commit `.env` to version control
- Use a dedicated Steam account for the bot
- Keep your Discord token secret
- Enable 2FA on your Binance account

## Support & Documentation

- Discord.js Documentation: https://discord.js.org/
- Steam Trade Link Format: https://steamcommunity.com/
- Binance API: https://binance-docs.github.io/apidocs/

---
**Version**: 1.0.0  
**Last Updated**: November 2025
