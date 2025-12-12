const { getAllCourseItemsController, getCourseItemsByIdsController } = require('../controllers/courseItem.controller');
const express = require('express');
const router = express.Router();

router.get('/', getAllCourseItemsController);
router.get('/by-ids', getCourseItemsByIdsController);

module.exports = router;