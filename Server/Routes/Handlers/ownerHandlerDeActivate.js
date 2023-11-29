const { ownerDeActivate } = require("../Controllers/ownerDeActivate");

const ownerHandlerDeActivate = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await ownerDeActivate(id);
    res.json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  ownerHandlerDeActivate,
};
