import { UserDB, BalanceDB, KeysDB, StatsDB } from '../database/db.js';
import { getMessage } from '../languages/i18n.js';

export function balanceCommand(message, userLang) {
  let user = UserDB.getByDiscordId(message.author.id);
  if (!user) {
    return message.reply(getMessage(userLang, 'errors.user_not_registered'));
  }

  const balances = BalanceDB.getAllBalances(user.id);
  const keys = KeysDB.getKeys(user.id);

  if (balances.length === 0 && keys === 0) {
    return message.reply(getMessage(userLang, 'commands.balance.empty'));
  }

  let balanceInfo = 'TF2 Keys: ' + keys + '\n';
  balances.forEach(b => {
    balanceInfo += `${b.crypto.toUpperCase()}: ${b.amount.toFixed(8)}\n`;
  });

  message.reply(getMessage(userLang, 'commands.balance.content', { balance: balanceInfo }));
}

export function statsCommand(message, userLang) {
  let user = UserDB.getByDiscordId(message.author.id);
  if (!user) {
    return message.reply(getMessage(userLang, 'errors.user_not_registered'));
  }

  const stats = StatsDB.getStats(user.id);
  const statsInfo = `Total Bought: ${stats?.totalBought || 0} keys\nTotal Sold: ${stats?.totalSold || 0} keys\nTotal Spent: $${(stats?.totalSpent || 0).toFixed(2)}\nTotal Earned: $${(stats?.totalEarned || 0).toFixed(2)}`;

  // Bot stats (simplified)
  const botStats = 'Keys in Stock: 1000\nTotal Transactions: 500\nTotal Volume: $50,000';

  message.reply(getMessage(userLang, 'commands.stats.content', { stats: statsInfo, botStats }));
}

export function stockCommand(message, userLang) {
  // In production, get from database
  const stock = 1000;
  message.reply(getMessage(userLang, 'commands.stock.content', { stock }));
}
