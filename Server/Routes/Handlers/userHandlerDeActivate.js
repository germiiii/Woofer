const { userDeActivate } = require("../controllers");

const userHandlerDeActivate = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await userDeActivate(id);
    res.json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  userHandlerDeActivate,
};
