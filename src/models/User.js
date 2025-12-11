const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  userId: {
    type: DataTypes.STRING(50),
    primaryKey: true
  },
  name: DataTypes.STRING(100),
  email: DataTypes.STRING(100),
  passwordHash: DataTypes.STRING(255)
}, {
  tableName: 'Users',
  timestamps: false
});

module.exports = User;
