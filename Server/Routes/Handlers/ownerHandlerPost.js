const { ownerPost } = require("../Controllers");

const ownerHandlerPost = async (req, res) => {
  try {
    const { username, dogs } = req.body;
    const UserWithNewOwner = await ownerPost(username, dogs);
    res.json({ UserWithNewOwner });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  ownerHandlerPost,
};
