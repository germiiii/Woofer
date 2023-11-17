const { walkerPost } = require("../controllers");

const walkerHandlerPost = async (req, res) => {
  try {
    const { id, dog_capacity } = req.body;
    const newWalker = await walkerPost(id, dog_capacity);
    res.json({ newWalker });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  walkerHandlerPost,
};
