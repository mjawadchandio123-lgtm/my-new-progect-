# TF2 Mann Co. Key Trading Bot

A comprehensive Discord bot for buying, selling, and managing TF2 (Team Fortress 2) Mann Co. Supply Crate Keys using various cryptocurrencies.

## Quick Start (Windows)

### Option 1: Automatic Setup
1. Double-click `setup.bat` - This will install dependencies and create configuration files
2. Edit the `.env` file with your configuration
3. Double-click `run-bot.bat` - The bot will start

### Option 2: Manual Setup
1. Make sure Node.js is installed (https://nodejs.org/)
2. Open Command Prompt in the bot folder
3. Run: `npm install`
4. Create `.env` file with your configuration
5. Run: `npm start`

## Requirements

- Node.js 18+ (https://nodejs.org/)
- Discord Bot Token (https://discord.com/developers/applications)
- Steam Account
- Binance API Keys (for crypto transactions)

## Configuration (.env file)

```
# Discord Bot
DISCORD_TOKEN=your_discord_token

# Steam
STEAM_USERNAME=your_steam_username
STEAM_PASSWORD=your_steam_password

# Binance
BINANCE_API_KEY=your_api_key
BINANCE_API_SECRET=your_api_secret

# Bot Settings
ADMIN_ID=your_discord_id
BOT_PREFIX=!
```

## Bot Commands

### Important Commands
- `!tradelink <url>` - Set your Steam Trade URL
- `!lang <code>` - Change bot language (en, es, zh, sr, de)
- `!how2buy` - Buy instructions
- `!how2sell` - Sell instructions
- `!how2deposit` - Deposit instructions
- `!how2withdraw` - Withdraw instructions

### Trading Commands
- `!buy <amount> <crypto>` - Buy keys with crypto
- `!sell <amount> <crypto>` - Sell keys for crypto
- `!balance` - Check your balance
- `!stats` - View trading stats
- `!stock` - Check bot's key stock
- `!withdraw <amount> <crypto> <address> <network>` - Withdraw crypto

### Trading Info
- `!prices <crypto>` - Check prices
- `!fees <crypto>` - Withdrawal fees
- `!mins <crypto>` - Minimum amounts
- `!buycost <amount> <crypto>` - Calculate buy cost
- `!sellcost <amount> <crypto>` - Calculate sell value

### Alerts
- `!announcements on/off` - Toggle announcements
- `!stockalert on/off <amount>` - Stock notifications
- `!spacealert on/off <amount>` - Inventory space notifications

## Features

✨ **Multi-Language Support** - English, Spanish, Chinese, Serbian, German

🔐 **Security** - Anti-scam protection, address validation, user verification

💰 **400+ Cryptocurrencies** - Support for all major coins and networks

📊 **Analytics** - Track profits, volumes, and user trends

🎮 **Steam Integration** - Seamless TF2 key trading

⚙️ **Admin Panel** - Manage users, settings, and inventory

## File Structure

```
/
├── src/
│   ├── index.js              - Main bot entry point
│   ├── commands/             - Command handlers
│   ├── handlers/             - Event handlers
│   ├── utils/                - Utility functions
│   ├── database/             - Database operations
│   ├── languages/            - Localization files
│   └── config/               - Configuration files
├── data/                      - Database files
├── logs/                      - Log files
├── .env                       - Configuration (create manually)
├── run-bot.bat               - Windows launcher
├── setup.bat                 - Windows setup
├── package.json              - Dependencies
└── README.md                 - This file
```

## Troubleshooting

### "Node.js is not installed"
- Download Node.js from https://nodejs.org/
- Restart your computer after installation
- Try running the .bat files again

### "npm install fails"
- Make sure you have internet connection
- Delete `node_modules` folder
- Run `setup.bat` again

### Bot won't start
- Check that `.env` file exists and is configured
- Verify Discord token is valid
- Check that all required environment variables are set
- Look for errors in the console

## Support

For issues or questions, please check the documentation or contact the bot administrator.

---
**Version**: 1.0.0  
**License**: MIT