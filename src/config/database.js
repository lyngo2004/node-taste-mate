require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.SEQ_DATABASE,
  process.env.SEQ_USER,
  process.env.SEQ_PASSWORD,
  {
    host: process.env.SEQ_SERVER,
    dialect: 'mssql',
    port: process.env.SEQ_PORT,
    logging: false,
    dialectOptions: {
      encrypt: true,
      trustServerCertificate: true
    }
  }
);

module.exports = sequelize;
