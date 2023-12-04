const { dogPost } = require("../Controllers");

const dogHandlerPost = async (req, res) => {
  try {
    const file = req.file;
    const { id, name, size, age, breed } = req.body;
    const data = {
      id,
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
