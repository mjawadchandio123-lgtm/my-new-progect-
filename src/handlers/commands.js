import { Client, GatewayIntentBits } from 'discord.js';
import { config } from '../config/config.js';
import { UserDB } from '../database/db.js';
import { getMessage } from '../languages/i18n.js';

// Import command handlers
import { tradelinkCommand, langCommand, how2buyCommand, how2sellCommand, how2depositCommand, how2withdrawCommand, ownerCommand, helpCommand } from './user.js';
import { buyCommand, sellCommand } from './trading.js';
import { balanceCommand, statsCommand, stockCommand } from './info.js';
import { pricesCommand, feesCommand, minsCommand, buycostCommand, sellcostCommand, buyamountCommand, sellamountCommand } from './pricing.js';
import { announcementsCommand, stockalertCommand, spacealertCommand } from './alerts.js';

export const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent],
});

export async function setupCommands() {
  client.on('messageCreate', async message => {
    if (message.author.bot) return;

    // Only process messages that start with prefix
    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Get user language
    let user = UserDB.getByDiscordId(message.author.id);
    const userLang = user ? UserDB.getLanguage(user.id) : config.defaultLanguage;

    try {
      switch (command) {
        // User commands
        case 'tradelink':
          tradelinkCommand(message, args, userLang);
          break;
        case 'lang':
          langCommand(message, args, userLang);
          break;
        case 'how2buy':
          how2buyCommand(message, userLang);
          break;
        case 'how2sell':
          how2sellCommand(message, userLang);
          break;
        case 'how2deposit':
          how2depositCommand(message, userLang);
          break;
        case 'how2withdraw':
          how2withdrawCommand(message, userLang);
          break;
        case 'owner':
          ownerCommand(message, userLang);
          break;

        // Trading commands
        case 'buy':
          await buyCommand(message, args, userLang);
          break;
        case 'sell':
          await sellCommand(message, args, userLang);
          break;

        // Info commands
        case 'balance':
          balanceCommand(message, userLang);
          break;
        case 'stats':
          statsCommand(message, userLang);
          break;
        case 'stock':
          stockCommand(message, userLang);
          break;

        // Pricing commands
        case 'prices':
        case 'price':
        case 'rate':
          await pricesCommand(message, args, userLang);
          break;
        case 'fees':
          feesCommand(message, args, userLang);
          break;
        case 'mins':
          minsCommand(message, args, userLang);
          break;
        case 'phonefees':
          feesCommand(message, args, userLang);
          break;
        case 'buycost':
          await buycostCommand(message, args, userLang);
          break;
        case 'sellcost':
          await sellcostCommand(message, args, userLang);
          break;
        case 'buyamount':
          await buyamountCommand(message, args, userLang);
          break;
        case 'sellamount':
          await sellamountCommand(message, args, userLang);
          break;

        // Alert commands
        case 'announcements':
          announcementsCommand(message, args, userLang);
          break;
        case 'stockalert':
          stockalertCommand(message, args, userLang);
          break;
        case 'spacealert':
          spacealertCommand(message, args, userLang);
          break;

        // Help
        case 'help':
          helpCommand(message, userLang);
          break;

        default:
          message.reply(getMessage(userLang, 'errors.not_found'));
      }
    } catch (error) {
      console.error(`Error handling command ${command}:`, error);
      message.reply(getMessage(userLang, 'errors.command_error'));
    }
  });
}
