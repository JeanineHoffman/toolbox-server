CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  user_name TEXT NOT NULL UNIQUE,
  user_password TEXT NOT NULL,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_created TIMESTAMP NOT NULL DEFAULT now(),
  date_modified TIMESTAMP
 );