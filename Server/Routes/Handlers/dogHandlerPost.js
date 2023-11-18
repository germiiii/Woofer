const { dogPost } = require("../Controllers");

const dogHandlerPost = async (req, res) => {
  try {
    const { username, dogs } = req.body;
    const newDog = await dogPost(username, dogs);
    res.json({ newDog });
  } catch (error) {}
};

module.exports = {
  dogHandlerPost,
};
