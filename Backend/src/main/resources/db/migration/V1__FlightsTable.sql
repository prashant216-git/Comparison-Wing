
-- V1__FlightsTable.sql
CREATE TABLE flights (
  id BIGSERIAL PRIMARY KEY,
  flightName VARCHAR(255),
  source VARCHAR(100),
  destination VARCHAR(100),
  departureTime VARCHAR(50),
  arrivalTime VARCHAR(50),
  duration VARCHAR(50),
  price VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_source on flights(source);
CREATE INDEX idx_dest on flights(destination);
