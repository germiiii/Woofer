const { User } = require("../../Database/db");
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const cloudinary = require("cloudinary").v2;
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});
const { uploadImage } = require("../../Routes/utils/uploadImage");
const transporter = require('../../nodeMailer/transporter');

const generateVerificationToken = () => {
  return crypto.randomBytes(20).toString('hex');
};

const userRegister = async (req, res) => {
  console.log("Entrando en userRegister");
  const { name, lastName, email, password, username, address, isWalker } =
    req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const verificationToken = generateVerificationToken();

  // upload image
  if (req.file) {
    await uploadImage(req.file.path);
    const newUser = await User.create({
      image: req.file.path,
      name,
      lastName,
      email,
      password: hashedPassword,
      username,
      address,
      isWalker,
      verificationToken
    })

    const mailOptions = {
      from: 'woofer@gmail.com',
      to: email,
      subject: 'Confirmación de Registro',
      text: `¡Gracias por registrarte en Woofer! Haz clic en el siguiente enlace para activar tu cuenta: hhttp://localhost:3000/activate/${verificationToken}`,
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo de confirmación:', error);
      } else {
        console.log('Correo de confirmación enviado:', info.response);
      }
    });
    return newUser;
  } else {
    const newUser = await User.create({
      image:
        "https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg",
      name,
      lastName,
      email,
      password: hashedPassword,
      username,
      address,
      isWalker,
      verificationToken
    })

    const mailOptions = {
      from: 'woofer@gmail.com',
      to: email,
      subject: 'Confirmación de Registro',
      text: `¡Gracias por registrarte en Woofer! Haz clic en el siguiente enlace para activar tu cuenta: http://localhost:3000/activate/${verificationToken}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo de confirmación:', error);
      } else {
        console.log('Correo de confirmación enviado:', info.response);
      }
    });;
    return newUser;
  }
};

module.exports = userRegister;
