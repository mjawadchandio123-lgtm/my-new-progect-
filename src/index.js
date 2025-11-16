import { config } from './config/config.js';
import { initializeDatabase } from './database/db.js';
import { client, setupCommands } from './handlers/commands.js';

// Initialize
console.log('🤖 TF2 Mann Co. Key Trading Bot Starting...');
console.log('Environment:', config.nodeEnv);

// Initialize database
try {
  initializeDatabase();
  console.log('✅ Database initialized');
} catch (error) {
  console.error('❌ Database initialization failed:', error);
  process.exit(1);
}

// Setup Discord bot
try {
  setupCommands();
  console.log('✅ Command handlers loaded');
} catch (error) {
  console.error('❌ Command setup failed:', error);
  process.exit(1);
}

// Login to Discord
client.once('ready', () => {
  console.log(`✅ Bot logged in as ${client.user.tag}`);
  console.log('🎮 Ready to process TF2 key trades!');
});

client.login(config.discordToken).catch(error => {
  console.error('❌ Failed to login to Discord:', error);
  process.exit(1);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n⏹️ Shutting down...');
  client.destroy();
  process.exit(0);
});

process.on('unhandledRejection', error => {
  console.error('❌ Unhandled rejection:', error);
});
