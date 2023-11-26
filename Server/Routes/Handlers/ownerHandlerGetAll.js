const { ownerGetAll } = require("../controllers");

const ownerHandlerGetAll = async (req, res) => {
  try {
    const owners = await ownerGetAll();
    res.json({ owners });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  ownerHandlerGetAll,
};
