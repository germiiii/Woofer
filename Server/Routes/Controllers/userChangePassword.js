const crypto = require('crypto');
const transporter = require('../../nodeMailer/transporter');
const { User } = require('../../Database/db');

const generateToken = () => {
  return crypto.randomBytes(20).toString('hex');
};

const updateUserPasswordInfo = async (email) => {
  //verificamos que el email existe en la bd
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error('Correo electrónico no encontrado');
  }

  const token = generateToken();
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000;
  await user.save();
  return token;
};

const sendPasswordResetEmail = (email, token, res) => {
  const mailOptions = {
    from: 'woofer@gmail.com',
    to: email,
    subject: 'Solicitud de Cambio de Contraseña',
    text: `Para cambiar tu contraseña, haz clic en el siguiente enlace: http://localhost:3001/changePassword/${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw error;
    } else {
      return info.response;
    }
  });
};

module.exports = {
  updateUserPasswordInfo,
  sendPasswordResetEmail,
};