const user = require ('../Database/models/user')

const postUser = async (req, res) => {
    try {
      const { name, surname, email, password, username, adress, isWalker } = req.body;
  
      //creacion en base de datoss
      const newUser = await user.create({
        name,
        surname,
        email,
        password,
        username,
        adress,
        isWalker,
      });

      res.status(200).json({ message: 'Registro exitoso', user: newUser });
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).json({ message: 'Error al registrar usuario' });
    }
}

module.exports = postUser;