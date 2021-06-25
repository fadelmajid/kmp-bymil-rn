-- Creation of USER table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL,
  username VARCHAR(256) NOT NULL,
  email VARCHAR(256) NOT NULL,
  password TEXT NOT NULL,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP,
  PRIMARY KEY (id)
);

-- Creation of ARTICLE table
CREATE TABLE IF NOT EXISTS articles (
  id SERIAL,
  UserId INT NOT NULL,
  title TEXT,
  author TEXT,
  body TEXT,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP,
  PRIMARY KEY (id)
);