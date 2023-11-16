const { ownerPost } = require("../controllers");

const ownerHandlerPost = async (req, res) => {
  try {
    const { id, dogs } = req.body;
    const newOwner = await ownerPost(id, dogs);
    res.json({ newOwner });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  ownerHandlerPost,
};
