const { userGetbyId } = require("../controllers");

const userGetByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userGetbyId(id);
    res.json(user);

  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "An error occurred while fetching user" });
  }
};

module.exports = {
  userGetByIdHandler,
};
