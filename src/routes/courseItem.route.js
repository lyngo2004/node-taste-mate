const { getAllCourseItemsController } = require('../controllers/courseItem.controller');
const express = require('express');
const router = express.Router();

router.get('/', getAllCourseItemsController);
module.exports = router;