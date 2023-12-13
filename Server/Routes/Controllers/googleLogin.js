const { User } = require("../../Database/db");
const jwt = require("jsonwebtoken");

const googleLogin = async (req, res) => {
  const { email } = req.body;

  try {
    console.log('Correo electrónico recibido:', email);

    const user = await User.findOne({ where: { email, is_active: true } });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user.id }, "secret", { expiresIn: "1h" });

    return res.status(201).json({ success: true, message: 'Authentication successful', token });
  } catch (error) {
    console.error('Error en la autenticación:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = { googleLogin }