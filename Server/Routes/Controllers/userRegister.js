const { User } = require("../../Database/db");
const bcrypt = require('bcrypt');

const userRegister = async (req, res) => {
  try {
    const { name, lastName, email, password, username, adress, isWalker, image, isOwner } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      image,
      name,
      lastName,
      email,
      password: hashedPassword,
      username,
      adress,
      isWalker,
      isOwner,
    });

    return newUser;
  } catch (error) {
    // Log the error for debugging purposes (optional)
    console.error("Error during user registration:", error);

    // Reject the promise with an error
    throw new Error("Error during user registration");
  }
};

module.exports = userRegister;
