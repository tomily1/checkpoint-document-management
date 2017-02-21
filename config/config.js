require('dotenv').config();

module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'document_mgmt',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: 'postgres',
    database: 'document_test',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    username: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    port: 5432,
    dialect: 'postgres'
  }
};
