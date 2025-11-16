import { cryptoConfig } from '../config/crypto.js';
import { getMessage } from '../languages/i18n.js';
import { getPrice, getWithdrawalFees, calculateBuyCost, calculateSellValue } from '../utils/cryptoHandler.js';

export async function pricesCommand(message, args, userLang) {
  if (args.length === 0) {
    // Show all prices
    const prices = {};
    for (const [key, config] of Object.entries(cryptoConfig)) {
      const price = await getPrice(key);
      prices[config.symbol] = `$${price.toFixed(2)}`;
    }

    let priceList = 'Current Prices:\n';
    Object.entries(prices).forEach(([crypto, price]) => {
      priceList += `${crypto}: ${price}\n`;
    });

    message.reply(getMessage(userLang, 'commands.prices.content', { prices: priceList }));
  } else {
    const crypto = args[0].toLowerCase();
    const price = await getPrice(crypto);

    if (!price) {
      return message.reply('Cryptocurrency not found.');
    }

    message.reply(`${crypto.toUpperCase()}: $${price.toFixed(2)}`);
  }
}

export function feesCommand(message, args, userLang) {
  if (args.length === 0) {
    return message.reply('Usage: !fees <crypto>');
  }

  const crypto = args[0].toLowerCase();
  const feeInfo = getWithdrawalFees(crypto);

  if (!feeInfo) {
    return message.reply('Cryptocurrency not found.');
  }

  const feeDetails = `
Cryptocurrency: ${crypto.toUpperCase()}
Withdrawal Fee: ${feeInfo.fee}
Minimum Withdrawal: ${feeInfo.minWithdrawal}
Available Networks: ${feeInfo.networks.join(', ')}
  `;

  message.reply(feeDetails);
}

export function minsCommand(message, args, userLang) {
  if (args.length === 0) {
    return message.reply('Usage: !mins <crypto>');
  }

  const crypto = args[0].toLowerCase();
  const feeInfo = getWithdrawalFees(crypto);

  if (!feeInfo) {
    return message.reply('Cryptocurrency not found.');
  }

  message.reply(`Minimum withdrawal for ${crypto.toUpperCase()}: ${feeInfo.minWithdrawal}`);
}

export async function buycostCommand(message, args, userLang) {
  if (args.length < 2) {
    return message.reply('Usage: !buycost <amount> <crypto>');
  }

  const amount = parseInt(args[0]);
  const crypto = args[1].toLowerCase();

  const costInfo = await calculateBuyCost(amount, crypto);

  if (!costInfo) {
    return message.reply('Invalid parameters.');
  }

  const cost = `
Keys: ${costInfo.keyAmount}
USD Value: $${costInfo.usdValue.toFixed(2)}
${crypto.toUpperCase()} Amount: ${costInfo.cryptoAmount}
Fee: ${costInfo.fee}
Total: ${costInfo.total}
  `;

  message.reply(cost);
}

export async function sellcostCommand(message, args, userLang) {
  if (args.length < 2) {
    return message.reply('Usage: !sellcost <amount> <crypto>');
  }

  const amount = parseInt(args[0]);
  const crypto = args[1].toLowerCase();

  const sellInfo = await calculateSellValue(amount, crypto);

  if (!sellInfo) {
    return message.reply('Invalid parameters.');
  }

  const value = `
Keys: ${sellInfo.keyAmount}
USD Value: $${sellInfo.usdValue.toFixed(2)}
${crypto.toUpperCase()} Amount: ${sellInfo.cryptoAmount}
Fee: ${sellInfo.fee}
  `;

  message.reply(value);
}

export async function buyamountCommand(message, args, userLang) {
  if (args.length < 2) {
    return message.reply('Usage: !buyamount <crypto_amount> <crypto>');
  }

  const cryptoAmount = parseFloat(args[0]);
  const crypto = args[1].toLowerCase();
  const price = await getPrice(crypto);

  if (!price) {
    return message.reply('Cryptocurrency not found.');
  }

  const usdValue = cryptoAmount * price;
  const keyAmount = Math.floor(usdValue / 2.5); // 2.5 USD per key

  message.reply(`With ${cryptoAmount} ${crypto.toUpperCase()}, you can buy approximately ${keyAmount} keys.`);
}

export async function sellamountCommand(message, args, userLang) {
  if (args.length < 2) {
    return message.reply('Usage: !sellamount <crypto_amount> <crypto>');
  }

  const cryptoAmount = parseFloat(args[0]);
  const crypto = args[1].toLowerCase();
  const price = await getPrice(crypto);

  if (!price) {
    return message.reply('Cryptocurrency not found.');
  }

  const usdValue = cryptoAmount * price;
  const keyAmount = Math.ceil(usdValue / 2.5); // 2.5 USD per key

  message.reply(`You need approximately ${keyAmount} keys to get ${cryptoAmount} ${crypto.toUpperCase()}.`);
}
