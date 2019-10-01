module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DATABASE_URL || 'postgresql://ct-admin@localhost/community-toolbox',
  TEST_DB_URL: process.env.TEST_DB_URL || 'postgresql://ct-admin@localhost/community-toolbox-test',
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-token'
}
