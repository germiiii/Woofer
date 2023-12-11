const { User } = require("../../Database/db");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
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
const transporter = require("../../nodeMailer/transporter");

const {
  validateSpecialAndNumber,
  validateAlphanumeric,
  validateAlphanumericNoSpaces,
  validateEmail,
} = require("../../Routes/utils/validations");

const generateVerificationToken = () => {
  return crypto.randomBytes(20).toString("hex");
};

const userRegister = async (req, res) => {
  const {
    name,
    lastName,
    email,
    password,
    username,
    address,
    city,
    province,
    selectedType,
  } = req.body;

  //validations
  if (
    !name ||
    !lastName ||
    !email ||
    !password ||
    !username ||
    !address ||
    !province
  ) {
    throw new Error("All fields are required");
  }

  // name validations
  if (typeof name !== "string") {
    throw new Error("Name debe ser un string");
  }
  if (name.length > 40) {
    throw new Error("Name debe ser menor a 40 caracteres");
  }
  if (await !validateSpecialAndNumber(name)) {
    throw new Error("Name no puede contener ni números ni símbolos");
  }

  // lastName validations
  if (typeof lastName !== "string") {
    throw new Error("Lastname debe ser un string");
  }
  if (lastName.length > 40) {
    throw new Error("Lastname debe ser menor a 40 caracteres");
  }
  if (await !validateSpecialAndNumber(lastName)) {
    throw new Error("Lastname no puede contener ni números ni símbolos");
  }

  // email validations
  if (typeof email !== "string") {
    throw new Error("Email debe ser un string");
  }
  if (!validateEmail(email)) {
    throw new Error("Email no es válido");
  }

  // username validations
  if (typeof username !== "string") {
    throw new Error("Username debe ser string");
  }
  if (username.length > 40) {
    throw new Error("Username debe ser menor a 40 caracteres");
  }
  if (await !validateAlphanumericNoSpaces(username)) {
    throw new Error("Username debe ser alfanumerico sin espacios");
  }

  // address validations
  if (typeof address !== "string") {
    throw new Error("Address debe ser un string");
  }
  if (address.length > 40) {
    throw new Error("Address debe ser menor a 40 caracteres");
  }
  if (await !validateAlphanumeric(address)) {
    throw new Error("Address debe ser alfanumerico");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const verificationToken = generateVerificationToken();

  // upload image and create
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
      city,
      province,
      verificationToken,
      selectedType,
    });

    const mailOptions = {
      from: "woofer@gmail.com",
      to: email,
      subject: "Confirmación de Registro",
      text: `¡Gracias por registrarte en Woofer! Haz clic en el siguiente enlace para activar tu cuenta: https://woofer-taupe.vercel.app/activate/${verificationToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error al enviar el correo de confirmación:", error);
      } else {
        console.log("Correo de confirmación enviado:", info.response);
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
      city,
      province,
      verificationToken,
      selectedType,
    });

    const mailOptions = {
      from: "woofer@gmail.com",
      to: email,
      subject: "Confirmación de Registro",
      text: `¡Gracias por registrarte en Woofer! Haz clic en el siguiente enlace para activar tu cuenta: https://woofer-taupe.vercel.app/activate/${verificationToken}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error al enviar el correo de confirmación:", error);
      } else {
        console.log("Correo de confirmación enviado:", info.response);
      }
    });
    return newUser;
  }
};

module.exports = userRegister;
