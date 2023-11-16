const { User } = require('../../Database/db')
const { updateUserPasswordInfo, sendPasswordResetEmail} = require ('../Controllers/userChangePassword')

const handleSuccess = (res, message) => {
  console.log(message);
  res.status(200).json({ message });
};

const handleFailure = (res, message, error) => {
  console.error(message, error);
  res.status(500).json({ message });
};

const userHandlerChangePassword = async (req, res) => {
  try {
    const { email } = req.body;

    //verificación de email en nuestra bd
    const user = await User.findOne({ where: { email } });

    if (!user) {
      handleFailure(res, 'Correo electrónico no encontrado');
      return;
    }

    //actualizar información de contraseña
    const token = await updateUserPasswordInfo(email);
    //enviar el mail
    await sendPasswordResetEmail(email, token, res);

    handleSuccess(res, 'Correo enviado con éxito');
  } catch (error) {
    handleFailure(res, 'Error en la solicitud de cambio de contraseña', error);
  }
};

module.exports = {
  userHandlerChangePassword,
};