const { User } = require("../../Database/db");
const bcrypt = require('bcrypt');

const userRegister = async (req, res) => {

    const { name, surname, email, password, username, adress, isWalker } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      surname,
      email,
      password: hashedPassword,
      username,
      adress,
      isWalker,
    });

    return newUser;
};

module.exports = userRegister;