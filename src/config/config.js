import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Discord
  discordToken: process.env.DISCORD_TOKEN,
  adminId: process.env.ADMIN_ID,
  prefix: process.env.BOT_PREFIX || '!',

  // Steam
  steamUsername: process.env.STEAM_USERNAME,
  steamPassword: process.env.STEAM_PASSWORD,
  steamAccountName: process.env.STEAM_ACCOUNT_NAME,
  sharedSecret: process.env.STEAM_SHARED_SECRET,
  identitySecret: process.env.STEAM_IDENTITY_SECRET,

  // Binance
  binanceApiKey: process.env.BINANCE_API_KEY,
  binanceApiSecret: process.env.BINANCE_API_SECRET,

  // Database
  dbPath: process.env.DB_PATH || './data/bot.db',

  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',
  nodeEnv: process.env.NODE_ENV || 'production',

  // Bot Settings
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'es', 'zh', 'sr', 'de'],
};

// Validate required environment variables
const requiredVars = ['DISCORD_TOKEN', 'STEAM_USERNAME', 'STEAM_PASSWORD', 'STEAM_ACCOUNT_NAME', 'STEAM_SHARED_SECRET', 'STEAM_IDENTITY_SECRET', 'BINANCE_API_KEY', 'BINANCE_API_SECRET', 'ADMIN_ID'];
const missing = requiredVars.filter(v => !process.env[v]);

if (missing.length > 0) {
  console.error('Missing required environment variables:', missing.join(', '));
  console.error('Please configure your .env file');
  process.exit(1);
}
