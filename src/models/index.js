const sequelize = require('../config/database');

const User = require('./User.js');
const CourseItem = require('./CourseItem.js');
const UserPreference = require('./UserPreference.js');

// Associations
User.hasMany(UserPreference, { foreignKey: 'userId' });
UserPreference.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  CourseItem,
  UserPreference
};
