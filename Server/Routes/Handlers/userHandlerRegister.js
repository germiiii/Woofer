const userRegister = require("../Controllers/userRegister");

const successHandler = (res, newUser) => {
  res.status(201).json({ message: "Registro exitoso", user: newUser });
};

const failureHandler = (res, error) => {
  console.error("Error al registrar usuario:", error.message);
  res.status(500).json({ error: error.message });
};

const userHandlerRegister = async (req, res) => {
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
