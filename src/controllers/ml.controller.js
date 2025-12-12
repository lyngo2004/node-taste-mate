const {
  getCandidatesService,
  getRecommendService,
} = require("../services/ml.service");

const getCandidates = async (req, res) => {
  const data = await getCandidatesService(req.body);
  return res.status(200).json(data);
};

const getRecommend = async (req, res) => {
  const data = await getRecommendService(req.body);
  return res.status(200).json(data);
};

module.exports = {
  getCandidates,
  getRecommend,
};
