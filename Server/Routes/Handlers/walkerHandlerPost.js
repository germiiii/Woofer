const { walkerPost } = require("../Controllers/walkerPost");

const walkerHandlerPost = async (req, res) => {
  try {
    const {
      id,
      dog_capacity,
      dog_size,
      walk_duration,
      sale_details,
      is_available,
      walkTypes,
    } = req.body;
    const newWalker = await walkerPost(
      id,
      dog_capacity,
      dog_size,
      walk_duration,
      sale_details,
      is_available,
      walkTypes,
    );
    res.json({ newWalker });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  walkerHandlerPost,
};
