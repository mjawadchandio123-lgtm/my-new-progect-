export const languages = {
  en: {
    commands: {
      tradelink: {
        description: 'Set your Steam Trade URL',
        usage: '!tradelink <url>',
        success: 'Trade link set successfully!',
        invalid: 'Invalid trade link. Please check and try again.',
      },
      lang: {
        description: 'Change bot language',
        usage: '!lang <code>',
        success: 'Language changed to {lang}',
        invalid: 'Language not supported. Available: {langs}',
      },
      how2buy: {
        description: 'Instructions on how to buy keys',
        content: 'To buy TF2 keys:\n1. Use !buy <amount> <crypto>\n2. Send cryptocurrency to the address provided\n3. Keys will be delivered to your Steam account',
      },
      how2sell: {
        description: 'Instructions on how to sell keys',
        content: 'To sell TF2 keys:\n1. Use !sell <amount> <crypto>\n2. Send the specified keys to the bot\'s Steam account\n3. Cryptocurrency will be sent to your wallet',
      },
      how2deposit: {
        description: 'Instructions on how to deposit',
        content: 'To deposit:\n1. Use !deposit\n2. Follow the instructions to send cryptocurrency\n3. Your balance will be updated',
      },
      how2withdraw: {
        description: 'Instructions on how to withdraw',
        content: 'To withdraw:\n1. Use !withdraw <amount> <crypto> <address> <network>\n2. Verify the details\n3. Cryptocurrency will be sent to your address',
      },
      buy: {
        description: 'Buy TF2 keys with cryptocurrency',
        usage: '!buy <amount> <crypto>',
        success: 'Purchase initiated! You need to send {amount} {crypto} to complete the trade.',
        insufficient_balance: 'Insufficient balance. You need {needed} {crypto}, but you have {balance}',
        invalid_amount: 'Invalid amount. Please specify a valid number.',
      },
      sell: {
        description: 'Sell TF2 keys for cryptocurrency',
        usage: '!sell <amount> <crypto>',
        success: 'Sale initiated! Please send {amount} keys to the bot\'s inventory.',
        insufficient_keys: 'You don\'t have enough keys. Available: {available}',
      },
      balance: {
        description: 'Check your balance',
        content: 'Your Balance:\n{balance}',
        empty: 'No balance information available.',
      },
      stats: {
        description: 'View trading statistics',
        content: 'Your Stats:\n{stats}\n\nBot Total Stats:\n{botStats}',
      },
      stock: {
        description: 'Check bot key stock',
        content: 'Bot has {stock} TF2 keys in stock',
      },
      withdraw: {
        description: 'Withdraw cryptocurrency',
        usage: '!withdraw <amount> <crypto> <address> <network>',
        success: 'Withdrawal processed! You will receive {amount} {crypto}',
        invalid: 'Invalid withdrawal parameters.',
      },
      prices: {
        description: 'Check cryptocurrency prices',
        usage: '!prices <crypto>',
        content: 'Current Prices:\n{prices}',
      },
      fees: {
        description: 'Check withdrawal fees',
        usage: '!fees <crypto>',
        content: 'Withdrawal Fees:\n{fees}',
      },
      buycost: {
        description: 'Calculate buy cost',
        usage: '!buycost <amount> <crypto>',
        content: 'To buy {amount} keys with {crypto}: {cost}',
      },
      sellcost: {
        description: 'Calculate sell value',
        usage: '!sellcost <amount> <crypto>',
        content: 'Selling {amount} keys for {crypto}: {value}',
      },
      announcements: {
        description: 'Toggle announcements',
        usage: '!announcements on/off',
        enabled: 'Announcements enabled',
        disabled: 'Announcements disabled',
      },
      owner: {
        description: 'Display owner profile',
        content: 'Bot Owner: {owner}',
      },
    },
    errors: {
      no_permission: 'You don\'t have permission to use this command.',
      command_error: 'An error occurred while processing your command.',
      not_found: 'Command not found. Use !help for available commands.',
      user_not_registered: 'Please set your trade link first using !tradelink',
    },
  },
  es: {
    commands: {
      tradelink: {
        description: 'Establece tu URL de comercio de Steam',
        usage: '!tradelink <url>',
        success: '¡Enlace de comercio establecido exitosamente!',
        invalid: 'Enlace de comercio inválido. Por favor verifica e intenta de nuevo.',
      },
      lang: {
        description: 'Cambiar idioma del bot',
        usage: '!lang <código>',
        success: 'Idioma cambiado a {lang}',
        invalid: 'Idioma no soportado. Disponibles: {langs}',
      },
      how2buy: {
        description: 'Instrucciones para comprar llaves',
        content: 'Para comprar llaves TF2:\n1. Usa !buy <cantidad> <cripto>\n2. Envía criptomoneda a la dirección proporcionada\n3. Las llaves serán entregadas a tu cuenta de Steam',
      },
      how2sell: {
        description: 'Instrucciones para vender llaves',
        content: 'Para vender llaves TF2:\n1. Usa !sell <cantidad> <cripto>\n2. Envía las llaves especificadas a la cuenta Steam del bot\n3. La criptomoneda será enviada a tu billetera',
      },
      balance: {
        description: 'Ver tu saldo',
        content: 'Tu Saldo:\n{balance}',
        empty: 'Sin información de saldo disponible.',
      },
      prices: {
        description: 'Ver precios de criptomonedas',
        usage: '!prices <cripto>',
        content: 'Precios Actuales:\n{prices}',
      },
    },
    errors: {
      no_permission: 'No tienes permiso para usar este comando.',
      command_error: 'Ocurrió un error al procesar tu comando.',
      not_found: 'Comando no encontrado. Usa !help para comandos disponibles.',
      user_not_registered: 'Por favor establece tu enlace de comercio primero usando !tradelink',
    },
  },
  zh: {
    commands: {
      tradelink: {
        description: '设置您的 Steam 交易 URL',
        usage: '!tradelink <url>',
        success: '交易链接设置成功！',
        invalid: '无效的交易链接。请检查并重试。',
      },
      lang: {
        description: '更改机器人语言',
        usage: '!lang <代码>',
        success: '语言已更改为 {lang}',
        invalid: '不支持的语言。可用：{langs}',
      },
      balance: {
        description: '查看您的余额',
        content: '您的余额：\n{balance}',
        empty: '没有可用的余额信息。',
      },
      prices: {
        description: '查看加密货币价格',
        usage: '!prices <加密>',
        content: '当前价格：\n{prices}',
      },
    },
    errors: {
      no_permission: '您没有权限使用此命令。',
      command_error: '处理您的命令时发生错误。',
      not_found: '命令未找到。使用 !help 查看可用命令。',
      user_not_registered: '请先使用 !tradelink 设置您的交易链接',
    },
  },
  sr: {
    commands: {
      tradelink: {
        description: 'Postavite vašu Steam Trade URL',
        usage: '!tradelink <url>',
        success: 'Trade link je uspešno postavljen!',
        invalid: 'Nevažeći trade link. Molimo proverite i pokušajte ponovo.',
      },
      lang: {
        description: 'Promenite jezik bota',
        usage: '!lang <kod>',
        success: 'Jezik promenjen na {lang}',
        invalid: 'Jezik nije podržan. Dostupni: {langs}',
      },
      balance: {
        description: 'Proverite svoje stanje',
        content: 'Vaše stanje:\n{balance}',
        empty: 'Nema dostupnih informacija o stanju.',
      },
    },
    errors: {
      no_permission: 'Nemate dozvolu za korišćenje ove komande.',
      command_error: 'Došlo je do greške pri obradi vaše komande.',
      not_found: 'Komanda nije pronađena. Koristite !help za dostupne komande.',
      user_not_registered: 'Molimo prvo postavite svoj trade link koristeći !tradelink',
    },
  },
  de: {
    commands: {
      tradelink: {
        description: 'Legen Sie Ihre Steam-Handels-URL fest',
        usage: '!tradelink <url>',
        success: 'Trade-Link erfolgreich festgelegt!',
        invalid: 'Ungültiger Trade-Link. Bitte überprüfen Sie und versuchen Sie es erneut.',
      },
      lang: {
        description: 'Ändern Sie die Botsprache',
        usage: '!lang <code>',
        success: 'Sprache geändert zu {lang}',
        invalid: 'Sprache nicht unterstützt. Verfügbar: {langs}',
      },
      balance: {
        description: 'Überprüfen Sie Ihren Kontostand',
        content: 'Ihr Kontostand:\n{balance}',
        empty: 'Keine Kontoinformationen verfügbar.',
      },
    },
    errors: {
      no_permission: 'Sie haben keine Berechtigung, diesen Befehl zu verwenden.',
      command_error: 'Fehler bei der Verarbeitung Ihres Befehls.',
      not_found: 'Befehl nicht gefunden. Verwenden Sie !help für verfügbare Befehle.',
      user_not_registered: 'Bitte legen Sie zunächst Ihren Trade-Link mit !tradelink fest',
    },
  },
};

export function getLanguageStrings(lang = 'en') {
  return languages[lang] || languages.en;
}

export function getMessage(lang, path, replacements = {}) {
  const strings = getLanguageStrings(lang);
  let message = path.split('.').reduce((obj, key) => obj?.[key], strings) || '';

  Object.entries(replacements).forEach(([key, value]) => {
    message = message.replace(`{${key}}`, value);
  });

  return message;
}
