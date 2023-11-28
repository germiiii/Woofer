const { walkerActivate } = require("../Controllers/walkerActivate");

const walkerHandlerActivate = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await walkerActivate(id);
    res.json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  walkerHandlerActivate,
};
