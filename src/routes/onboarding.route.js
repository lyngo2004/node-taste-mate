const express = require('express');
const router = express.Router();
const { getOnboardingQuesController, submitOnboardingController } = require('../controllers/onboarding.controller');

router.get('/', getOnboardingQuesController);
router.post('/submit', submitOnboardingController);

module.exports = router;
