const { walkerDeActivate } = require("../controllers");

const walkerHandlerDeActivate = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await walkerDeActivate(id);
    res.json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  walkerHandlerDeActivate,
};
