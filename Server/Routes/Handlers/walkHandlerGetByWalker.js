const { walkGetByWalker } = require("../controllers");

const walkHandlerGetByWalker = async (req, res) => {
  try {
    const { WalkerId } = req.params;
    const walksFromWalker = await walkGetByWalker(WalkerId);
    res.json({ walksFromWalker });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  walkHandlerGetByWalker,
};
