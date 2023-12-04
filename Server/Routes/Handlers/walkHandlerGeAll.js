const { walkGetAll } = require("../Controllers");

const walkHandlerGeAll = async (req, res) => {
  try {
    // const { ownerId } = req.params;
    const walksFromOwner = await walkGetAll();
    res.json({ walksFromOwner });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  walkHandlerGeAll,
};
