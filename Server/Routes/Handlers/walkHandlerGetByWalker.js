const { walkGetByWalker } = require("../Controllers");

const walkHandlerGetByWalker = async (req, res) => {
  try {
    const { walkerId } = req.params;
    const { date } = req.query;
    const walksFromWalker = await walkGetByWalker(walkerId, date);
    res.json({ walksFromWalker });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  walkHandlerGetByWalker,
};
