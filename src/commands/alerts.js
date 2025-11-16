import { UserDB, AlertsDB } from '../database/db.js';
import { getMessage } from '../languages/i18n.js';

export function announcementsCommand(message, args, userLang) {
  if (args.length === 0) {
    return message.reply('Usage: !announcements on/off');
  }

  const setting = args[0].toLowerCase();

  if (!['on', 'off'].includes(setting)) {
    return message.reply('Please use: on or off');
  }

  let user = UserDB.getByDiscordId(message.author.id);
  if (!user) {
    user = { id: UserDB.create(message.author.id) };
  }

  if (setting === 'on') {
    message.reply(getMessage(userLang, 'commands.announcements.enabled'));
  } else {
    message.reply(getMessage(userLang, 'commands.announcements.disabled'));
  }
}

export function stockalertCommand(message, args, userLang) {
  if (args.length < 2) {
    return message.reply('Usage: !stockalert on/off <amount>');
  }

  const setting = args[0].toLowerCase();
  const amount = parseInt(args[1]);

  if (!['on', 'off'].includes(setting)) {
    return message.reply('Please use: on or off');
  }

  if (isNaN(amount) || amount <= 0) {
    return message.reply('Please specify a valid amount.');
  }

  let user = UserDB.getByDiscordId(message.author.id);
  if (!user) {
    user = { id: UserDB.create(message.author.id) };
  }

  if (setting === 'on') {
    AlertsDB.setStockAlert(user.id, amount);
    message.reply(`Stock alert set for ${amount} keys.`);
  } else {
    AlertsDB.disableAlert(user.id, 'stock');
    message.reply('Stock alert disabled.');
  }
}

export function spacealertCommand(message, args, userLang) {
  if (args.length < 2) {
    return message.reply('Usage: !spacealert on/off <amount>');
  }

  const setting = args[0].toLowerCase();
  const amount = parseInt(args[1]);

  if (!['on', 'off'].includes(setting)) {
    return message.reply('Please use: on or off');
  }

  if (isNaN(amount) || amount <= 0) {
    return message.reply('Please specify a valid amount.');
  }

  let user = UserDB.getByDiscordId(message.author.id);
  if (!user) {
    user = { id: UserDB.create(message.author.id) };
  }

  if (setting === 'on') {
    AlertsDB.setStockAlert(user.id, amount);
    message.reply(`Space alert set for ${amount} spaces.`);
  } else {
    AlertsDB.disableAlert(user.id, 'space');
    message.reply('Space alert disabled.');
  }
}
