const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CourseItem = sequelize.define('CourseItem', {
  courseId: {
    type: DataTypes.STRING(50),
    primaryKey: true
  },
  courseName: DataTypes.STRING(150),
  imageUrl: DataTypes.STRING(255),
  category: DataTypes.STRING(50)
}, {
  tableName: 'CourseItems',
  timestamps: false
});

module.exports = CourseItem;
