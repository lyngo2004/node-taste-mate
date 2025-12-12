const express = require("express");
const router = express.Router();
const mlController = require("../controllers/ml.controller");

router.post("/candidates", mlController.getCandidates);
router.post("/recommend", mlController.getRecommend);

module.exports = router;
