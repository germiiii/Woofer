const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../../Database/db");
const { userGetbyId } = require("./userGetbyId");

const userLogin = async (email, password) => {
  const user = await User.findOne({ where: { email, is_active: true } });
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const loggedUser = await userGetbyId(user.id);

  const token = jwt.sign({ userId: user.id }, "secret", { expiresIn: "1h" });
  userData = {
    token,
    loggedUser,
  };
  return userData;
};

module.exports = { userLogin };
