const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../../Database/db");

const userLogin = async (eMail, password) => {
  const user = await User.findOne({ where: { eMail } });

  if (!user) {
    throw new Error("Invalid email");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, "secret", { expiresIn: "1h" });
  return token;
};

module.exports = { userLogin };
