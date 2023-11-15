const { User } = require("../../Database/db");

const bcrypt = require('bcrypt');

const userRegister = async (req, res) => {
  try {
    console.log('Entrando en userRegister');
    console.log(User); 

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

    res.status(200).json({ message: 'Registro exitoso', user: newUser });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

module.exports = userRegister;