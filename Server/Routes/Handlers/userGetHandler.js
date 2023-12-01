const { userGetAll } = require("../Controllers/userGetAll");

const userGetAllHandler = async (req, res) => {
  try {
    const { role } = req.query; //role is not required
    // Call the userGetAll controller to fetch all users
    const users = await userGetAll(role);
    
    res.json(users);

  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "An error occurred while fetching users" });
  }
};

module.exports = {
  userGetAllHandler,
};
