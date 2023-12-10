const { walkGetByOwner } = require("../Controllers");

const walkHandlerGetByOwner = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const { date } = req.query;
    const walksFromOwner = await walkGetByOwner(ownerId, date);
    res.json({ walksFromOwner });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  walkHandlerGetByOwner,
};
