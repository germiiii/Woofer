const { walkGetByOwner } = require("../controllers");

const walkHandlerGetByOwner = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const walksFromOwner = await walkGetByWalker(ownerId);
    res.json({ walksFromOwner });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  walkHandlerGetByOwner,
};
