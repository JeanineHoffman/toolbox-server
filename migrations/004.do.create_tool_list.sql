CREATE TABLE tool_list (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  userID TEXT NOT NULL,
  toolID TEXT NOT NULL,
);