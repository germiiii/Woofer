const bcrypt = require('bcrypt');
const { User } = require("../../Database/db");

const changePassword = async (req, res) => {
  const token = req.params.token;
  const newPassword = req.body.password; // Cambiado de "newPassword" a "password"
  console.log('Token obtenido:', token);

  try {
    const user = await User.findOne({
      where: { is_active: true, resetPasswordToken: token },
    });
    console.log('Usuario:', user)

    if (!user) {
      console.log('Usuario no encontrado o no activo');
      return res.status(404).json({ error: 'Usuario no encontrado o no activo' });
    }

    try {
      if (!newPassword) {
        console.log('Contraseña no proporcionada');
        return res.status(400).json({ error: 'Contraseña no proporcionada' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetPasswordToken = null;
      console.log('Nueva contraseña actualizada:', user.password);
      await user.save();

      console.log('Contraseña cambiada con éxito');
      res.status(200).json({ message: 'Contraseña cambiada con éxito' });
    } catch (updateError) {
      console.error('Error al actualizar la contraseña:', updateError);
      res.status(500).json({ error: 'Error al cambiar la contraseña' });
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = { changePassword };