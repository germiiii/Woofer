const { ownerPost } = require("../Controllers");

const ownerHandlerPost = async (req, res) => {
  try {
    const file = req.file;
    const { userID, name, size, age, breed } = req.body;
    const data = {
      userID,
      name,
      size,
      age,
      breed,
    };
    const UserWithNewOwner = await ownerPost(data, file);
    res.json({ UserWithNewOwner });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  ownerHandlerPost,
};
