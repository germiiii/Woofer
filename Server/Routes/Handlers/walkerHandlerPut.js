const { walkerPut } = require("../Controllers");

const walkerHandlerPut = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      dog_capacity,
      dog_size,
      walk_duration,
      sale_details,
      is_available,
      walkTypes,
    } = req.body;
    const response = await walkerPut(
      id,
      dog_capacity,
      dog_size,
      walk_duration,
      sale_details,
      is_available,
      walkTypes
    );
    res.json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  walkerHandlerPut,
};
