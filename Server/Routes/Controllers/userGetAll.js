const { User } = require("../../Database/db");

const userGetAll = async () => {
    // Fetch all users from the database
    const users = await User.findAll();
    return users;
  };

module.exports = { userGetAll };
