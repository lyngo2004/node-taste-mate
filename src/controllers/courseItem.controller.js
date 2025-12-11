const { getAllCourseItemsService } = require('../services/courseItem.service');

const getAllCourseItemsController = async (req, res) => {
    try {
        const courseItems = await getAllCourseItemsService();
        res.status(200).json(courseItems);
    } catch (error) {
        console.error("COURSE ITEM ERROR:", error);
        res.status(500).json({ message: 'Error retrieving course items', error });
    }
};

module.exports = {
    getAllCourseItemsController
};