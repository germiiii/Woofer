const { User } = require("../../Database/db");
const cloudinary = require("cloudinary").v2;
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});
const {
  validateSpecialAndNumber,
  validateAlphanumeric,
  validateAlphanumericNoSpaces,
} = require("../../Routes/utils/validations");
const { uploadImage } = require("../../Routes/utils/uploadImage");

const userEdit = async (data, file) => {
  const { userID, name, lastName, username, address, province, selectedType } =
    data;

  // validations
  if (!userID) {
    throw new Error("userID is required");
  }
  const user = await User.findOne({ where: { id: userID, is_active: true } });
  if (!user) {
    throw new Error("User not found");
  }

  //changes
  if (username) {
    if (typeof username !== "string") {
      throw new Error("Username debe ser string");
    }
    if (username.length > 40) {
      throw new Error("Username debe ser menor a 40 caracteres");
    }
    if (await !validateAlphanumericNoSpaces(username)) {
      throw new Error("Username debe ser alfanumerico sin espacios");
    }
    // if (await User.findOne({ where: { username } })) {
    //   throw new Error("Username ya está en uso");
    // }
    User.update(
      { username: username },
      {
        where: { id: userID, is_active: true },
      }
    );
  }

  if (name) {
    if (typeof name !== "string") {
      throw new Error("Name debe ser un string");
    }
    if (name.length > 40) {
      throw new Error("Name debe ser menor a 40 caracteres");
    }
    // if (await !validateSpecialAndNumber(name)) {
    //   throw new Error("Name no puede contener ni números ni símbolos");
    // }
    await User.update(
      { name: name },
      {
        where: { id: userID, is_active: true },
      }
    );
  }

  if (lastName) {
    if (typeof lastName !== "string") {
      throw new Error("Lastname debe ser un string");
    }
    if (lastName.length > 40) {
      throw new Error("Lastname debe ser menor a 40 caracteres");
    }
    // if (await !validateSpecialAndNumber(lastName)) {
    //   throw new Error("Lastname no puede contener ni números ni símbolos");
    // }
    await User.update(
      { lastName: lastName },
      {
        where: { id: userID, is_active: true },
      }
    );
  }

  if (address) {
    if (typeof address !== "string") {
      throw new Error("Address debe ser un string");
    }
    if (address.length > 40) {
      throw new Error("Address debe ser menor a 40 caracteres");
    }
    await User.update(
      { address: address },
      {
        where: { id: userID, is_active: true },
      }
    );
  }

  if (province) {
    await User.update(
      { province: province },
      {
        where: { id: userID, is_active: true },
      }
    );
  }

  if (selectedType) {
    await User.update(
      { selectedType: selectedType },
      {
        where: { id: userID, is_active: true },
      }
    );
  }

  if (file) {
    await uploadImage(file.path);
    await User.update(
      { image: file.path },
      {
        where: { id: userID, is_active: true },
      }
    );
  }

  // data to return
  const userData = await User.findOne({
    attributes: {
      exclude: [
        "password",
        "verificationToken",
        "resetPasswordToken",
        "resetPasswordExpires",
      ],
    },
    where: { id: userID, is_active: true },
  });

  return userData;
};

module.exports = { userEdit };
