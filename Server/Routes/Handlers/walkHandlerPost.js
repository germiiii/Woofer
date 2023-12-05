const { walkPost } = require("../Controllers/walkPost");

const walkHandlerPost = async (req, res) => {
  try {
    const { ownerId, walkerId, walkTypes, dogs, duration, totalPrice } = req.body;
    const newWalk = await walkPost(
      ownerId,
      walkerId,
      walkTypes,
      dogs,
      duration,
      totalPrice
    );
    res.json({ newWalk });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  walkHandlerPost,
};
