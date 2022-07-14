CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password_digest VARCHAR(255) NOT NULL
  name VARCHAR(255),
  phone VARCHAR(20),
  address text,
);