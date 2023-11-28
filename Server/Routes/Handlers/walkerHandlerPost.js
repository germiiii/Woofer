const { walkerPost } = require("../controllers");

const walkerHandlerPost = async (req, res) => {
  try {
    const { username, dog_capacity, is_available } = req.body;
    const newWalker = await walkerPost(username, dog_capacity, is_available);
    res.json({ newWalker });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  walkerHandlerPost,
};
