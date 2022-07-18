CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(20),
  lastName VARCHAR(20),
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL
);