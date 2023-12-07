const { walkerGetById } = require("../Controllers");

const walkerHandlerGetById = async (req, res) => {
  try {
    const { id } = req.params;
    const walker = await walkerGetById(id);
    res.json( walker );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  walkerHandlerGetById,
};
