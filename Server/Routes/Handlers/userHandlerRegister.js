const userRegister = require  ('../Controllers/userRegister');

const successHandler = (res, newUser) => {
    res.status(200).json({ message: 'Registro exitoso', user: newUser });
};

const failureHandler = (res, error) => {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error al registrar usuario' });
};

const userHandlerRegister= async (req, res) => {
    try {
      const newUser = await userRegister(req);
      successHandler(res, newUser);
    } catch (error) {
      failureHandler(res, error);
    }
  };
  
module.exports = {
    userHandlerRegister,
};
  
  
  
  
  
  