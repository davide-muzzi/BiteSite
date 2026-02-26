PRAGMA foreign_keys = on;

CREATE TABLE IF NOT EXISTS users(
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT,
  email TEXT,
  password_hash TEXT,
  subscription TEXT check(subscription IN ('beginner', 'masterchef', 'enterprise')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  subscription_status TEXT,
  subscription_period_end TEXT,
  cancel_at_period_end INTEGER,
  subscription_canceled INTEGER
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