const { walkGet } = require("../Controllers");

const walkHandlerGet = async (req, res) => {
  try {
    const { id, idWalk, date } = req.query;
    const allWalks = await walkGet(id, idWalk, date);
    res.json({ allWalks });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  walkHandlerGet,
};
