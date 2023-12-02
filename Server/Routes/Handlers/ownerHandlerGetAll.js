const { ownerGetAll } = require("../Controllers/ownerGetAll");

const ownerHandlerGetAll = async (req, res) => {
  try {
    const { province } = req.query;
    const owners = await ownerGetAll(province);
    res.json({ owners });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  ownerHandlerGetAll,
};
