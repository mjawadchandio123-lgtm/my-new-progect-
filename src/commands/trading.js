import { UserDB, BalanceDB, KeysDB, StatsDB } from '../database/db.js';
import { getMessage } from '../languages/i18n.js';
import { calculateBuyCost } from '../utils/cryptoHandler.js';

export async function buyCommand(message, args, userLang) {
  if (args.length < 2) {
    return message.reply(getMessage(userLang, 'commands.buy.usage'));
  }

  const keyAmount = parseInt(args[0]);
  const crypto = args[1].toLowerCase();

  if (isNaN(keyAmount) || keyAmount <= 0) {
    return message.reply(getMessage(userLang, 'commands.buy.invalid_amount'));
  }

  // Get user
  let user = UserDB.getByDiscordId(message.author.id);
  if (!user) {
    user = { id: UserDB.create(message.author.id) };
  }

  // Check balance
  const userBalance = BalanceDB.getBalance(user.id, crypto);
  const costInfo = await calculateBuyCost(keyAmount, crypto);

  if (!costInfo) {
    return message.reply(getMessage(userLang, 'errors.command_error'));
  }

  if (userBalance < parseFloat(costInfo.total)) {
    return message.reply(
      getMessage(userLang, 'commands.buy.insufficient_balance', {
        needed: costInfo.total,
        crypto: crypto.toUpperCase(),
        balance: userBalance.toFixed(8),
      })
    );
  }

  // Process purchase
  BalanceDB.subtractBalance(user.id, crypto, parseFloat(costInfo.total));
  KeysDB.addKeys(user.id, keyAmount);

  // Update stats
  StatsDB.initialize(user.id);
  StatsDB.updateStats(user.id, {
    totalBought: keyAmount,
    totalSpent: parseFloat(costInfo.usdValue),
  });

  message.reply(
    getMessage(userLang, 'commands.buy.success', {
      amount: keyAmount,
      crypto: crypto.toUpperCase(),
    })
  );
}

export async function sellCommand(message, args, userLang) {
  if (args.length < 2) {
    return message.reply(getMessage(userLang, 'commands.sell.usage'));
  }

  const keyAmount = parseInt(args[0]);
  const crypto = args[1].toLowerCase();

  if (isNaN(keyAmount) || keyAmount <= 0) {
    return message.reply(getMessage(userLang, 'commands.sell.usage'));
  }

  // Get user
  let user = UserDB.getByDiscordId(message.author.id);
  if (!user) {
    user = { id: UserDB.create(message.author.id) };
  }

  // Check keys
  const userKeys = KeysDB.getKeys(user.id);
  if (userKeys < keyAmount) {
    return message.reply(
      getMessage(userLang, 'commands.sell.insufficient_keys', {
        available: userKeys,
      })
    );
  }

  // Process sale
  KeysDB.subtractKeys(user.id, keyAmount);
  const saleValue = (keyAmount * 2.5).toFixed(8); // Simplified - should use actual price
  BalanceDB.addBalance(user.id, crypto, parseFloat(saleValue));

  // Update stats
  StatsDB.initialize(user.id);
  StatsDB.updateStats(user.id, {
    totalSold: keyAmount,
    totalEarned: parseFloat(saleValue),
  });

  message.reply(
    getMessage(userLang, 'commands.sell.success', {
      amount: keyAmount,
      crypto: crypto.toUpperCase(),
    })
  );
}
