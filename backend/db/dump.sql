CREATE DATABASE IF NOT EXISTS games;
USE games;

CREATE TABLE games (
  appid INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  release_date DATE,
  english BOOLEAN,
  developer VARCHAR(255),
  publisher VARCHAR(255),
  platforms VARCHAR(255),
  required_age INT,
  categories TEXT,
  genres TEXT,
  steamspy_tags TEXT,
  achievements INT,
  positive_ratings INT,
  negative_ratings INT,
  average_playtime INT,
  median_playtime INT,
  owners TEXT,
  price DECIMAL(10,2)
);

CREATE TABLE media (
  appid INT PRIMARY KEY,
  header_image TEXT
);

LOAD DATA LOCAL INFILE '/csv_data/steam.csv'
INTO TABLE games
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/csv_data/steam_media_data.csv'
INTO TABLE media
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
