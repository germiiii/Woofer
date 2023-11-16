const { User } = require("../../Database/db");
const bcrypt = require('bcrypt');

const userRegister = async (req, res) => {
  
    console.log('Entrando en userRegister');
    console.log(User); 

    const { name, lastName, email, password, username, adress, isWalker } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      lastName,
      email,
      password: hashedPassword,
      username,
      adress,
      isWalker,
    });

    return newUser;
};

module.exports = userRegister;