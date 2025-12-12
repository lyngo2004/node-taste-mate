const axios = require("axios");

const ML_BASE = "https://meal-rec-api.onrender.com/api/v1";

const getCandidatesService = async (payload) => {
  try {
    const res = await axios.post(`${ML_BASE}/candidates`, payload);
    return {
      EC: 0,
      EM: "OK",
      DT: res.data.data,
    };
  } catch (error) {
    console.error("ML candidates error:", error.response?.data || error);
    return {
      EC: 1,
      EM: "ML candidates failed",
      DT: [],
    };
  }
};

const getRecommendService = async (payload) => {
  try {
    const res = await axios.post(`${ML_BASE}/recommend`, payload);
    return {
      EC: 0,
      EM: "OK",
      DT: res.data.data,
    };
  } catch (error) {
    console.error("ML recommend error:", error.response?.data || error);
    return {
      EC: 1,
      EM: "ML recommend failed",
      DT: [],
    };
  }
};

module.exports = {
  getCandidatesService,
  getRecommendService,
};
