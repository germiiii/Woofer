const { User } = require("../../Database/db");

const activateAccount = async (req, res) => {
    const { verificationToken } = req.params;
  
    try {
      const user = await User.findOne({
        where: { verificationToken, is_active: false },
      });
  
      if (user) {
        // Usuario encontrado, activar la cuenta
        user.is_active = true;
        user.verificationToken = null; // Limpia el token después de activar la cuenta
        await user.save();
  
        return res.status(200).json({ success: true, message: 'Cuenta activada exitosamente' });
      } else {
        return res.status(404).json({ success: false, message: 'Token de verificación inválido' });
      }
    } catch (error) {
      console.error('Error al activar la cuenta:', error);
      return res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
  };
  
  module.exports = { activateAccount };