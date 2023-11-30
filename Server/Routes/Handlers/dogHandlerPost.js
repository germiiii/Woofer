const { dogPost } = require("../controllers");

const dogHandlerPost = async (req, res) => {
  try {
    const file = req.file;
    const { username, name, size, age, breed } = req.body;
    const data = {
      username,
      name,
      size,
      age,
      breed,
    };
    const UpdatedUser = await dogPost(data, file);
    res.json({ UpdatedUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  dogHandlerPost,
};
