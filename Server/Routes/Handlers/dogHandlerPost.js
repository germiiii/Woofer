const { dogPost } = require("../Controllers");

const dogHandlerPost = async (req, res) => {
  try {
    const { username, dogs } = req.body;
    const UpdatedUser = await dogPost(username, dogs);
    res.json({ UpdatedUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  dogHandlerPost,
};
