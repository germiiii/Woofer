const { ownerActivate } = require("../controllers");

const ownerHandlerActivate = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await ownerActivate(id);
    res.json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  ownerHandlerActivate,
};
