const { walkerSetAvailable } = require("../controllers");

const walkerHandlerSetAvailable = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_available } = req.body;
    const response = await walkerSetAvailable(id, is_available);
    res.json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  walkerHandlerSetAvailable,
};
