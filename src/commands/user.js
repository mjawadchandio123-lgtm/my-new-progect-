import { UserDB } from '../database/db.js';
import { getMessage, languages } from '../languages/i18n.js';

export function tradelinkCommand(message, args, userLang) {
  if (args.length === 0) {
    return message.reply(getMessage(userLang, 'commands.tradelink.usage'));
  }

  const tradelink = args[0];

  // Basic validation
  if (!tradelink.includes('steamcommunity.com') || !tradelink.includes('trade')) {
    return message.reply(getMessage(userLang, 'commands.tradelink.invalid'));
  }

  let user = UserDB.getByDiscordId(message.author.id);
  if (!user) {
    user = { id: UserDB.create(message.author.id, tradelink) };
  } else {
    UserDB.updateTradeLink(user.id, tradelink);
  }

  message.reply(getMessage(userLang, 'commands.tradelink.success'));
}

export function langCommand(message, args, userLang) {
  if (args.length === 0) {
    return message.reply(getMessage(userLang, 'commands.lang.usage'));
  }

  const langCode = args[0].toLowerCase();
  const supportedLangs = Object.keys(languages);

  if (!supportedLangs.includes(langCode)) {
    return message.reply(
      getMessage(userLang, 'commands.lang.invalid', {
        langs: supportedLangs.join(', '),
      })
    );
  }

  let user = UserDB.getByDiscordId(message.author.id);
  if (!user) {
    user = { id: UserDB.create(message.author.id) };
  }

  UserDB.setLanguage(user.id, langCode);

  message.reply(
    getMessage(langCode, 'commands.lang.success', {
      lang: langCode.toUpperCase(),
    })
  );
}

export function how2buyCommand(message, userLang) {
  message.reply(getMessage(userLang, 'commands.how2buy.content'));
}

export function how2sellCommand(message, userLang) {
  message.reply(getMessage(userLang, 'commands.how2sell.content'));
}

export function how2depositCommand(message, userLang) {
  message.reply(getMessage(userLang, 'commands.how2deposit.content'));
}

export function how2withdrawCommand(message, userLang) {
  message.reply(getMessage(userLang, 'commands.how2withdraw.content'));
}

export function ownerCommand(message, userLang) {
  message.reply(getMessage(userLang, 'commands.owner.content', { owner: 'Bot Developer' }));
}

export function helpCommand(message, userLang) {
  const help = `
**TF2 Bot Commands**

**Important Commands**
\`!tradelink <url>\` - Set your Steam Trade URL
\`!lang <code>\` - Change language (en, es, zh, sr, de)
\`!how2buy\` - Buy instructions
\`!how2sell\` - Sell instructions
\`!how2deposit\` - Deposit instructions
\`!how2withdraw\` - Withdraw instructions

**Trading Commands**
\`!buy <amount> <crypto>\` - Buy keys
\`!sell <amount> <crypto>\` - Sell keys
\`!balance\` - Check balance
\`!stats\` - View stats
\`!stock\` - Check stock
\`!withdraw <amount> <crypto> <address> <network>\` - Withdraw

**Info Commands**
\`!prices <crypto>\` - Check prices
\`!fees <crypto>\` - Check fees
\`!buycost <amount> <crypto>\` - Calculate buy cost
\`!sellcost <amount> <crypto>\` - Calculate sell value

**Alerts**
\`!announcements on/off\` - Toggle announcements
\`!stockalert on/off <amount>\` - Stock alerts
  `;

  message.reply(help);
}
