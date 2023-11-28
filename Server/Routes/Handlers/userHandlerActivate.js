const { userActivate } = require("../Controllers/userActivate");

const userHandlerActivate = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await userActivate(id);
    res.json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  userHandlerActivate,
};
