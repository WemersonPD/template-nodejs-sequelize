require('dotenv').config();
module.exports = {
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  host: process.env.DATABASE_HOST,
  dialect: process.env.DATABASE_DIALECT || 'postgres',
  define: {
    timestemps: false,
  },
};
