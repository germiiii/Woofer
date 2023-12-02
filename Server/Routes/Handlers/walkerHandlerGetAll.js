const { walkerGetAll } = require("../controllers");

const walkerHandlerGetAll = async (req, res) => {
  try {
    const { province, is_available, walkTypes } = req.query;
    const walkers = await walkerGetAll(province, is_available, walkTypes);
    res.json({ walkers });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  walkerHandlerGetAll,
};
