const { userEdit } = require("../Controllers");

const userHandlerEdit = async (req, res) => {
  try {
    const file = req.file;
    const { id, name, lastName, username, address, city, province } = req.body;
    const data = {
      userID: id,
      name,
      lastName,
      username,
      address,
      city,
      province,
    };
    const editedUser = await userEdit(data, file);
    res.json({ editedUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  userHandlerEdit,
};
