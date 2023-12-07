const { walkGetAll } = require("../Controllers");

const walkHandlerGetAll = async (req, res) => {
  try {
    const { date } = req.params;
    const allWalks = await walkGetAll(date);
    res.json({ allWalks });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  walkHandlerGetAll,
};
