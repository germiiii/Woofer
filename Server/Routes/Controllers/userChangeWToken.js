const { User } = require('../../Database/db');

const changeWToken =  async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
  
    try {
      // Encuentra al usuario por el token
      const user = await User.findOne({ where: { resetPasswordToken: token } });
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'Token inválido' });
      }
  
      // Actualiza la contraseña del usuario
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      user.resetPasswordToken = null; // Limpia el token después de cambiar la contraseña
      user.resetPasswordExpires = null;
  
      await user.save();
  
      return res.status(200).json({ success: true, message: 'Contraseña cambiada exitosamente' });
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      return res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
  };
  
  module.exports = changeWToken;