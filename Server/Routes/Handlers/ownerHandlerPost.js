const { ownerPost } = require("../Controllers");

const ownerHandlerPost = async (req, res) => {
  try {
    const { username, dogs } = req.body;
    const newOwner = await ownerPost(username, dogs);
    res.json({ newOwner });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  ownerHandlerPost,
};
