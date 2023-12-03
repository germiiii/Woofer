const { walkerGetAll } = require("../Controllers");

const walkerHandlerGetAll = async (req, res) => {
  try {
    const { province, is_available } = req.query;
    const walkers = await walkerGetAll(province, is_available);
    res.json({ walkers });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  walkerHandlerGetAll,
};
