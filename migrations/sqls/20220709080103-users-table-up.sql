CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(20),
  lastName VARCHAR(20),
  password VARCHAR(255) NOT NULL
);