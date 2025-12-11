const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const UserPreference = sequelize.define('UserPreference', {
  prefId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.STRING(50),
    references: {
      model: 'Users',
      key: 'userId'
    }
  },
  attributeType: DataTypes.STRING(50),
  attributeValue: DataTypes.STRING(255)
}, {
  tableName: 'UserPreferences',
  timestamps: false
});

UserPreference.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(UserPreference, { foreignKey: 'userId' });

module.exports = UserPreference;
