CREATE TABLE checkouts (
  tool_id INTEGER 
    REFERENCES tools(id) ON DELETE CASCADE NOT NULL,
  user_id INTEGER
    REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  return_date DATE DEFAULT CURRENT_DATE + integer '4'
);
