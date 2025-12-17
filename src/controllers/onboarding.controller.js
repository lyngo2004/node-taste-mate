const { submitOnboardingService } = require('../services/onboarding.service')
const questions = require('../config/onboardingQues.json');

const getOnboardingQuesController = async(req, res) => {
    res.set("Cache-Control", "no-store");
    return res.status(200).json({
        EC: 0,
        EM: "Success",
        DT: questions
    });
}

const submitOnboardingController = async (req, res) => {
    const response = await submitOnboardingService(req.body);
    return res.status(200).json(response);
};

module.exports = {
    getOnboardingQuesController,
    submitOnboardingController
}
