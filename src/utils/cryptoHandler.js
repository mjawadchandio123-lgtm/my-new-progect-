import axios from 'axios';
import { config } from '../config/config.js';
import { cryptoConfig, tf2KeyPrice } from '../config/crypto.js';

let priceCache = {};
let lastPriceUpdate = 0;
const PRICE_CACHE_DURATION = 60000; // 1 minute

// Mock Binance price fetching
async function fetchBinancePrices() {
  try {
    const response = await axios.get('https://api.binance.com/api/v3/ticker/price?symbols=["BTCUSD","ETHUSD","USDCUSD","USDTUSD"]', {
      timeout: 5000,
    });

    const prices = {};
    response.data.forEach(item => {
      if (item.symbol === 'BTCUSD') prices.bitcoin = parseFloat(item.price);
      if (item.symbol === 'ETHUSD') prices.ethereum = parseFloat(item.price);
      if (item.symbol === 'USDCUSD') prices.usdc = parseFloat(item.price);
      if (item.symbol === 'USDTUSD') prices.usdt = parseFloat(item.price);
    });

    return prices;
  } catch (error) {
    console.error('Error fetching prices from Binance:', error.message);
    return getDefaultPrices();
  }
}

function getDefaultPrices() {
  return {
    bitcoin: 45000,
    ethereum: 2500,
    usdc: 1,
    usdt: 1,
  };
}

export async function getPrices(forceRefresh = false) {
  const now = Date.now();

  if (!forceRefresh && lastPriceUpdate && now - lastPriceUpdate < PRICE_CACHE_DURATION && Object.keys(priceCache).length > 0) {
    return priceCache;
  }

  priceCache = await fetchBinancePrices();
  lastPriceUpdate = now;
  return priceCache;
}

export async function getPrice(crypto) {
  const prices = await getPrices();
  return prices[crypto] || 0;
}

export async function calculateBuyCost(keyAmount, crypto) {
  const price = await getPrice(crypto);
  const cryptoConfig_item = cryptoConfig[crypto];

  if (!price || !cryptoConfig_item) return null;

  const totalUSD = keyAmount * tf2KeyPrice;
  const cryptoAmount = totalUSD / price;
  const fee = cryptoAmount * (cryptoConfig_item.fees.trading || 0.001);

  return {
    keyAmount,
    usdValue: totalUSD,
    cryptoAmount: cryptoAmount.toFixed(8),
    fee: fee.toFixed(8),
    total: (cryptoAmount + fee).toFixed(8),
  };
}

export async function calculateSellValue(keyAmount, crypto) {
  const price = await getPrice(crypto);
  const cryptoConfig_item = cryptoConfig[crypto];

  if (!price || !cryptoConfig_item) return null;

  const totalUSD = keyAmount * tf2KeyPrice;
  const cryptoAmount = totalUSD / price;
  const fee = cryptoAmount * (cryptoConfig_item.fees.trading || 0.001);

  return {
    keyAmount,
    usdValue: totalUSD,
    cryptoAmount: (cryptoAmount - fee).toFixed(8),
    fee: fee.toFixed(8),
    total: cryptoAmount.toFixed(8),
  };
}

export function getWithdrawalFees(crypto) {
  const cryptoConfig_item = cryptoConfig[crypto];
  if (!cryptoConfig_item) return null;

  return {
    crypto,
    fee: cryptoConfig_item.fees.withdrawal,
    minWithdrawal: cryptoConfig_item.minWithdrawal,
    networks: cryptoConfig_item.networks,
  };
}

export async function validateWithdrawalAddress(address, network) {
  // Basic validation - in production, use more robust libraries
  const addressLengths = {
    bitcoin: { bitcoin: 26, lightning: 100 },
    ethereum: { ethereum: 42, polygon: 42, arbitrum: 42 },
    usdc: { ethereum: 42, polygon: 42, arbitrum: 42 },
    usdt: { ethereum: 42, tron: 34, polygon: 42 },
  };

  if (!address || typeof address !== 'string') return false;
  if (address.length < 20) return false;

  return true;
}

export async function simulateWithdrawal(userId, amount, crypto, address, network) {
  // In production, this would interact with actual crypto APIs
  return {
    success: true,
    transactionId: `tx_${Date.now()}`,
    amount,
    crypto,
    address,
    network,
    fee: cryptoConfig[crypto]?.fees.withdrawal || 0,
  };
}
