const { CourseItem } = require('../models');

const getAllCourseItemsService = async () => {
  return await CourseItem.findAll();
}

module.exports = {
  getAllCourseItemsService
};
