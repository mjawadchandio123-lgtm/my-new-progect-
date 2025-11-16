import Database from 'better-sqlite3';
import { config } from '../config/config.js';
import fs from 'fs';
import path from 'path';

const dbDir = path.dirname(config.dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(config.dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize database schema
export function initializeDatabase() {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      discordId TEXT UNIQUE NOT NULL,
      steamTradeLink TEXT,
      language TEXT DEFAULT 'en',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Balances table
  db.exec(`
    CREATE TABLE IF NOT EXISTS balances (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      crypto TEXT NOT NULL,
      amount REAL DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id),
      UNIQUE(userId, crypto)
    )
  `);

  // Keys table
  db.exec(`
    CREATE TABLE IF NOT EXISTS keys (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      amount INTEGER DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `);

  // Trades table
  db.exec(`
    CREATE TABLE IF NOT EXISTS trades (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      type TEXT NOT NULL,
      keyAmount INTEGER,
      cryptoAmount REAL,
      crypto TEXT,
      status TEXT DEFAULT 'pending',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      completedAt DATETIME,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `);

  // Bot inventory
  db.exec(`
    CREATE TABLE IF NOT EXISTS botInventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      crypto TEXT UNIQUE NOT NULL,
      balance REAL DEFAULT 0,
      keysInStock INTEGER DEFAULT 0,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Stats table
  db.exec(`
    CREATE TABLE IF NOT EXISTS stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT,
      totalBought INTEGER DEFAULT 0,
      totalSold INTEGER DEFAULT 0,
      totalSpent REAL DEFAULT 0,
      totalEarned REAL DEFAULT 0,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `);

  // Alerts table
  db.exec(`
    CREATE TABLE IF NOT EXISTS alerts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      type TEXT NOT NULL,
      enabled INTEGER DEFAULT 1,
      threshold INTEGER,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `);

  console.log('Database initialized successfully');
}

// User operations
export const UserDB = {
  create: (discordId, steamTradeLink = null) => {
    const stmt = db.prepare(`
      INSERT INTO users (id, discordId, steamTradeLink, language)
      VALUES (?, ?, ?, 'en')
    `);
    const id = `user_${Date.now()}`;
    stmt.run(id, discordId, steamTradeLink);
    return id;
  },

  getByDiscordId: (discordId) => {
    return db.prepare('SELECT * FROM users WHERE discordId = ?').get(discordId);
  },

  getById: (id) => {
    return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  },

  updateTradeLink: (userId, tradeLink) => {
    db.prepare('UPDATE users SET steamTradeLink = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?').run(tradeLink, userId);
  },

  setLanguage: (userId, lang) => {
    db.prepare('UPDATE users SET language = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?').run(lang, userId);
  },

  getLanguage: (userId) => {
    const result = db.prepare('SELECT language FROM users WHERE id = ?').get(userId);
    return result?.language || 'en';
  },
};

// Balance operations
export const BalanceDB = {
  getBalance: (userId, crypto) => {
    const result = db.prepare('SELECT amount FROM balances WHERE userId = ? AND crypto = ?').get(userId, crypto);
    return result?.amount || 0;
  },

  getAllBalances: (userId) => {
    return db.prepare('SELECT crypto, amount FROM balances WHERE userId = ?').all(userId);
  },

  addBalance: (userId, crypto, amount) => {
    db.prepare(`
      INSERT INTO balances (userId, crypto, amount)
      VALUES (?, ?, ?)
      ON CONFLICT(userId, crypto) DO UPDATE SET amount = amount + ?, updatedAt = CURRENT_TIMESTAMP
    `).run(userId, crypto, amount, amount);
  },

  subtractBalance: (userId, crypto, amount) => {
    const current = BalanceDB.getBalance(userId, crypto);
    if (current < amount) return false;
    db.prepare('UPDATE balances SET amount = amount - ?, updatedAt = CURRENT_TIMESTAMP WHERE userId = ? AND crypto = ?').run(amount, userId, crypto);
    return true;
  },
};

// Keys operations
export const KeysDB = {
  getKeys: (userId) => {
    const result = db.prepare('SELECT amount FROM keys WHERE userId = ?').get(userId);
    return result?.amount || 0;
  },

  addKeys: (userId, amount) => {
    db.prepare(`
      INSERT INTO keys (userId, amount)
      VALUES (?, ?)
      ON CONFLICT(userId) DO UPDATE SET amount = amount + ?, updatedAt = CURRENT_TIMESTAMP
    `).run(userId, amount, amount);
  },

  subtractKeys: (userId, amount) => {
    const current = KeysDB.getKeys(userId);
    if (current < amount) return false;
    db.prepare('UPDATE keys SET amount = amount - ?, updatedAt = CURRENT_TIMESTAMP WHERE userId = ?').run(amount, userId);
    return true;
  },
};

// Trade operations
export const TradeDB = {
  create: (userId, type, keyAmount, cryptoAmount, crypto) => {
    return db.prepare(`
      INSERT INTO trades (userId, type, keyAmount, cryptoAmount, crypto, status)
      VALUES (?, ?, ?, ?, ?, 'pending')
    `).run(userId, type, keyAmount, cryptoAmount, crypto);
  },

  updateStatus: (tradeId, status) => {
    db.prepare('UPDATE trades SET status = ?, completedAt = CURRENT_TIMESTAMP WHERE id = ?').run(status, tradeId);
  },

  getTradeHistory: (userId, limit = 10) => {
    return db.prepare(`
      SELECT * FROM trades WHERE userId = ? ORDER BY createdAt DESC LIMIT ?
    `).all(userId, limit);
  },
};

// Stats operations
export const StatsDB = {
  initialize: (userId) => {
    db.prepare('INSERT OR IGNORE INTO stats (userId) VALUES (?)').run(userId);
  },

  getStats: (userId) => {
    return db.prepare('SELECT * FROM stats WHERE userId = ?').get(userId);
  },

  updateStats: (userId, updates) => {
    const current = StatsDB.getStats(userId) || {};
    const set = Object.keys(updates).map(k => `${k} = ${k} + ?`).join(', ');
    const values = Object.values(updates);
    db.prepare(`UPDATE stats SET ${set}, updatedAt = CURRENT_TIMESTAMP WHERE userId = ?`).run(...values, userId);
  },
};

// Bot inventory operations
export const BotInventoryDB = {
  initialize: (crypto) => {
    db.prepare('INSERT OR IGNORE INTO botInventory (crypto) VALUES (?)').run(crypto);
  },

  getCryptoBalance: (crypto) => {
    const result = db.prepare('SELECT balance FROM botInventory WHERE crypto = ?').get(crypto);
    return result?.balance || 0;
  },

  getKeysInStock: () => {
    const result = db.prepare('SELECT SUM(keysInStock) as total FROM botInventory').get();
    return result?.total || 0;
  },

  updateCryptoBalance: (crypto, amount) => {
    db.prepare('UPDATE botInventory SET balance = balance + ?, updatedAt = CURRENT_TIMESTAMP WHERE crypto = ?').run(amount, crypto);
  },

  updateKeysInStock: (amount) => {
    db.prepare('UPDATE botInventory SET keysInStock = keysInStock + ? WHERE crypto = "TF2_KEY"').run(amount);
  },
};

// Alerts operations
export const AlertsDB = {
  setStockAlert: (userId, threshold) => {
    db.prepare(`
      INSERT INTO alerts (userId, type, threshold)
      VALUES (?, 'stock', ?)
      ON CONFLICT(userId, type) DO UPDATE SET threshold = ?, enabled = 1
    `).run(userId, threshold, threshold);
  },

  disableAlert: (userId, type) => {
    db.prepare('UPDATE alerts SET enabled = 0 WHERE userId = ? AND type = ?').run(userId, type);
  },

  getActiveAlerts: (type) => {
    return db.prepare('SELECT * FROM alerts WHERE type = ? AND enabled = 1').all(type);
  },
};

// Export database instance
export default db;
