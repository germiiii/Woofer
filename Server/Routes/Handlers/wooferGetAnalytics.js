const { wooferAnalytics } = require("../Controllers");

const wooferGetAnalytics = async (req, res) => {
  try {
    const wooferAnalyticsData = await wooferAnalytics();
    res.json(wooferAnalyticsData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  wooferGetAnalytics,
};
