-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  shop TEXT,
  role TEXT NOT NULL DEFAULT 'merchant',
  api_key TEXT UNIQUE,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Merchants table
CREATE TABLE IF NOT EXISTS merchants (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  shop TEXT UNIQUE NOT NULL,
  plan TEXT NOT NULL DEFAULT 'FREE',
  status TEXT NOT NULL DEFAULT 'active',
  webhook_url TEXT,
  webhook_secret TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL,
  shop TEXT NOT NULL,
  provider TEXT NOT NULL,
  method TEXT NOT NULL,
  amount REAL NOT NULL,
  currency TEXT NOT NULL DEFAULT 'THB',
  status TEXT NOT NULL DEFAULT 'pending',
  customer_email TEXT,
  customer_name TEXT,
  redirect_url TEXT,
  metadata TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (shop) REFERENCES merchants(shop)
);

-- Webhook events table
CREATE TABLE IF NOT EXISTS webhook_events (
  id TEXT PRIMARY KEY,
  transaction_id TEXT,
  event_type TEXT NOT NULL,
  provider TEXT NOT NULL,
  payload TEXT NOT NULL,
  processed INTEGER NOT NULL DEFAULT 0,
  processed_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (transaction_id) REFERENCES transactions(id)
);

-- Commissions table
CREATE TABLE IF NOT EXISTS commissions (
  id TEXT PRIMARY KEY,
  merchant_id TEXT NOT NULL,
  transaction_id TEXT NOT NULL,
  amount REAL NOT NULL,
  rate REAL NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  payout_id TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (merchant_id) REFERENCES merchants(id),
  FOREIGN KEY (transaction_id) REFERENCES transactions(id)
);

-- Payouts table
CREATE TABLE IF NOT EXISTS payouts (
  id TEXT PRIMARY KEY,
  merchant_id TEXT NOT NULL,
  amount REAL NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  bank_account TEXT,
  processed_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (merchant_id) REFERENCES merchants(id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_transactions_shop ON transactions(shop);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at);
CREATE INDEX IF NOT EXISTS idx_webhook_events_transaction ON webhook_events(transaction_id);
CREATE INDEX IF NOT EXISTS idx_commissions_merchant ON commissions(merchant_id);
CREATE INDEX IF NOT EXISTS idx_commissions_status ON commissions(status);
