const { walkGet } = require("../Controllers");

const walkHandlerGet = async (req, res) => {
  try {
    const { id, date } = req.query;
    const allWalks = await walkGet(id, date);
    res.json({ allWalks });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  walkHandlerGet,
};
