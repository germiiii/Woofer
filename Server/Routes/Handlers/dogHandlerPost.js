const { dogPost } = require("../Controllers");

const dogHandlerPost = async (req, res) => {
  try {
    const { username, dogs } = req.body;
    const newDog = await dogPost(username, dogs);
    res.json({ newDog });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  dogHandlerPost,
};
