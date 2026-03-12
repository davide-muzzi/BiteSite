PRAGMA foreign_keys = on;

CREATE TABLE IF NOT EXISTS users(
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT,
  email TEXT,
  password_hash TEXT,
  subscription TEXT check(subscription IN ('beginner', 'masterchef', 'enterprise')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  period_end INTEGER,
  cancel_at_period_end INTEGER,
  subscription_active INTEGER
);

CREATE TABLE IF NOT EXISTS projects(
  project_id INTEGER PRIMARY KEY AUTOINCREMENT,
  "name" TEXT,
  website TEXT,
  website_title TEXT,
  website_route TEXT,
  published INTEGER DEFAULT 0,
  fk_user_id INTEGER,
  FOREIGN KEY (fk_user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reviews(
  review_id INTEGER PRIMARY KEY AUTOINCREMENT,
  "name" TEXT,
  rating INTEGER CHECK(rating BETWEEN 1 AND 5),
  title TEXT,
  "message" TEXT,
  "date" TEXT,
  fk_project_id INTEGER,
  FOREIGN KEY (fk_project_id) REFERENCES projects(project_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reservations(
  reservation_id INTEGER PRIMARY KEY AUTOINCREMENT,
  "name" TEXT,
  email TEXT,
  "location" TEXT,
  people INTEGER,
  "date" TEXT,
  "time" TEXT,
  "status" TEXT CHECK("status" IN ('open', 'accepted', 'denied')),
  fk_project_id INTEGER,
  FOREIGN KEY (fk_project_id) REFERENCES projects(project_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers(
  subscriber_id INTEGER PRIMARY KEY AUTOINCREMENT,
  "name" TEXT,
  email TEXT NOT NULL,
  status TEXT CHECK(status IN ('active', 'unsubscribed')) DEFAULT 'active',
  subscribed_at TEXT DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at TEXT,
  fk_project_id INTEGER NOT NULL,
  UNIQUE(email, fk_project_id),
  FOREIGN KEY (fk_project_id) REFERENCES projects(project_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS newsletters(
  newsletter_id INTEGER PRIMARY KEY AUTOINCREMENT,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  asset_manifest TEXT,
  status TEXT CHECK(status IN ('draft', 'queued', 'sent', 'failed')) DEFAULT 'draft',
  scheduled_for TEXT,
  sent_at TEXT,
  fk_project_id INTEGER NOT NULL,
  FOREIGN KEY (fk_project_id) REFERENCES projects(project_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS newsletter_recipients(
  recipient_id INTEGER PRIMARY KEY AUTOINCREMENT,
  fk_newsletter_id INTEGER NOT NULL,
  fk_subscriber_id INTEGER NOT NULL,
  delivery_status TEXT CHECK(delivery_status IN ('pending', 'sent', 'failed')) DEFAULT 'pending',
  delivery_error TEXT,
  delivered_at TEXT,
  FOREIGN KEY (fk_newsletter_id) REFERENCES newsletters(newsletter_id) ON DELETE CASCADE,
  FOREIGN KEY (fk_subscriber_id) REFERENCES newsletter_subscribers(subscriber_id) ON DELETE CASCADE,
  UNIQUE(fk_newsletter_id, fk_subscriber_id)
);
