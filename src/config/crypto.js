export const cryptoConfig = {
  // Major cryptocurrencies and their properties
  bitcoin: {
    symbol: 'BTC',
    name: 'Bitcoin',
    minWithdrawal: 0.0001,
    networks: ['bitcoin', 'lightning'],
    fees: {
      withdrawal: 0.0001,
      trading: 0.001,
    },
  },
  ethereum: {
    symbol: 'ETH',
    name: 'Ethereum',
    minWithdrawal: 0.01,
    networks: ['ethereum', 'polygon', 'arbitrum'],
    fees: {
      withdrawal: 0.005,
      trading: 0.001,
    },
  },
  usdc: {
    symbol: 'USDC',
    name: 'USD Coin',
    minWithdrawal: 10,
    networks: ['ethereum', 'polygon', 'arbitrum'],
    fees: {
      withdrawal: 1,
      trading: 0.001,
    },
  },
  usdt: {
    symbol: 'USDT',
    name: 'Tether',
    minWithdrawal: 10,
    networks: ['ethereum', 'tron', 'polygon'],
    fees: {
      withdrawal: 1,
      trading: 0.001,
    },
  },
};

// TF2 Key pricing (in USD)
export const tf2KeyPrice = 2.5; // Base price

// Supported cryptocurrencies
export const supportedCryptos = Object.keys(cryptoConfig).map(key => ({
  ...cryptoConfig[key],
  id: key,
}));
