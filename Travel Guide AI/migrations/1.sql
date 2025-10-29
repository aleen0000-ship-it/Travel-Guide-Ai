
CREATE TABLE destinations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  description TEXT,
  currency_code TEXT,
  timezone TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hotels (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  destination_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price_per_night REAL NOT NULL,
  rating REAL,
  amenities TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE attractions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  destination_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  price REAL,
  rating REAL,
  opening_hours TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transportation (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  destination_id INTEGER NOT NULL,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price REAL,
  duration TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE phrases (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  destination_id INTEGER NOT NULL,
  category TEXT NOT NULL,
  english_text TEXT NOT NULL,
  local_text TEXT NOT NULL,
  pronunciation TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE trip_plans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  destination_id INTEGER NOT NULL,
  budget REAL NOT NULL,
  duration_days INTEGER NOT NULL,
  total_estimated_cost REAL,
  itinerary TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_hotels_destination ON hotels(destination_id);
CREATE INDEX idx_attractions_destination ON attractions(destination_id);
CREATE INDEX idx_transportation_destination ON transportation(destination_id);
CREATE INDEX idx_phrases_destination ON phrases(destination_id);
CREATE INDEX idx_trip_plans_destination ON trip_plans(destination_id);
