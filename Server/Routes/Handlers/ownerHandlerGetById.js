const { ownerGetById } = require("../controllers");

const ownerHandlerGetById = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = await ownerGetById(id);
    res.json({ owner });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  ownerHandlerGetById,
};
