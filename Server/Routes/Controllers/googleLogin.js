const { User } = require("../../Database/db");

const googleLogin = async (req, res) => {
    const { email } = req.body;
  
    try {
      console.log('Correo electrónico recibido:', email);
  
      const user = await User.findOne({ where: { email, is_active: true } });
  
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
  
      return res.status(201).json({ success: true, message: 'Authentication successful' });
    } catch (error) {
      console.error('Error en la autenticación:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };

module.exports = { googleLogin }