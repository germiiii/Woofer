const { User } = require("../../Database/db");
const bcrypt = require('bcrypt');
const cloudinary = require("cloudinary").v2;
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});
const { uploadImage } = require('../../Routes/utils/uploadImage')
const userRegister = async (req, res) => {
  
  console.log('Entrando en userRegister');
  console.log(User); 

  const { name, lastName, email, password, username, address, isWalker } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  	// upload image
    if (req.file) {
      await uploadImage(req.file.path)
    }

  const newUser = await User.create({
    image: req.file.path,
    name,
    lastName,
    email,
    password: hashedPassword,
    username,
    address,
    isWalker,
  });

  return newUser;
};

module.exports = userRegister;