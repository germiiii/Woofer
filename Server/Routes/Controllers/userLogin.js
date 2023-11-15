const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../../Database/db");

const userLogin = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, "secret", { expiresIn: "1h" });
  return token;
};

module.exports = { userLogin };
