const { getAllCourseItemsService, getCourseItemsByIdsService } = require('../services/courseItem.service');

const getAllCourseItemsController = async (req, res) => {
    try {
        const courseItems = await getAllCourseItemsService();
        res.status(200).json(courseItems);
    } catch (error) {
        console.error("COURSE ITEM ERROR:", error);
        res.status(500).json({ message: 'Error retrieving course items', error });
    }
};

const getCourseItemsByIdsController = async (req, res) => {
  const { ids } = req.query;

  // "1,2,3" -> ["1","2","3"]
  const idList = ids
    ? ids.split(',').map(id => id.trim()).filter(Boolean)
    : [];

  const data = await getCourseItemsByIdsService(idList);
  return res.status(200).json(data);
};

module.exports = {
    getAllCourseItemsController,
    getCourseItemsByIdsController
};