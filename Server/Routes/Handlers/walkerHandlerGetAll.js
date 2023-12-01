const { walkerGetAll } = require("../controllers");

const walkerHandlerGetAll = async (req, res) => {
  try {
    const walkers = await walkerGetAll();
    res.json({ walkers });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  walkerHandlerGetAll,
};
