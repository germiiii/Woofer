const { walkPost } = require("../controllers");

const walkHandlerPost = async (req, res) => {
  try {
    const { ownerId, walkerId, dogs, duration, totalPrice } = req.body;
    const newWalk = await walkPost(
      ownerId,
      walkerId,
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