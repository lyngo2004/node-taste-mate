const { CourseItem } = require('../models');
const { Op } = require("sequelize");

const getAllCourseItemsService = async () => {
  return await CourseItem.findAll();
}

const getCourseItemsByIdsService = async (ids) => {
  try {
    // validate
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return {
        EC: 1,
        EM: "Invalid ids parameter",
        DT: [],
      };
    }

    const stringIds = ids.map((id) => String(id));

    const data = await CourseItem.findAll({
      where: {
        courseId: {
          [Op.in]: stringIds,
        },
      },
    });

    return {
      EC: 0,
      EM: "OK",
      DT: data,
    };
  } catch (error) {
    console.error("getCourseItemsByIdsService error:", error);
    return {
      EC: 1,
      EM: "Error retrieving course items by ids",
      DT: [],
    };
  }
};

module.exports = {
  getAllCourseItemsService,
  getCourseItemsByIdsService
};
