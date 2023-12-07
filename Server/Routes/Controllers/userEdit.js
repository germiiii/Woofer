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
} = require("../../Routes/utils/validations");
const { uploadImage } = require("../../Routes/utils/uploadImage");

const userEdit = async (data, file) => {
  const { userID, name, lastname, username, address, city, province } = data;

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
    if (typeof username === "string") {
      throw new Error("El username debe ser string");
    }
    if (username.length < 40) {
      throw new Error("El username debe ser menor a 40 caracteres");
    }
    if (validateAlphanumeric(username)) {
      throw new Error("El username debe ser alfanumerico sin espacios");
    }
    User.update(
      { username: username },
      {
        where: { id: userID, is_active: true },
      }
    );
  }

  if (name) {
    if (
      typeof name === "string" &&
      name.length < 40 &&
      validateSpecialAndNumber(name)
    ) {
      await User.update(
        { name: name },
        {
          where: { id: userID, is_active: true },
        }
      );
    } else {
      throw new Error("Error en el nombre");
    }
  }

  if (lastname) {
    if (
      typeof lastname === "string" &&
      lastname.length < 40 &&
      validateSpecialAndNumber(lastname)
    ) {
      await User.update(
        { lastName: lastname },
        {
          where: { id: userID, is_active: true },
        }
      );
    } else {
      throw new Error("Error en el apellido");
    }
  }

  if (address) {
    if (
      typeof address === "string" &&
      address.length < 40 &&
      validateAlphanumeric(address)
    ) {
      await User.update(
        { address: address },
        {
          where: { id: userID, is_active: true },
        }
      );
    } else {
      throw new Error("Error en la dirección");
    }
  }

  // if (city) {
  //   if (
  //     typeof city === "string" &&
  //     city.length < 40 &&
  //     validateSpecialAndNumber(city)
  //   ) {
  //     await User.update(
  //       { city: city },
  //       {
  //         where: { id: userID, is_active: true },
  //       }
  //     );
  //   } else {
  //     throw new Error("Error en la ciudad");
  //   }
  // } //! ver qué onda con este campo, no es de user supuestamente

  if (province) {
    await User.update(
      { province: province },
      {
        where: { id: userID, is_active: true },
      }
    );
  }

  if (file) {
    await uploadImage(file.path);
    await User.update({ image: file.path });
  }

  // data to return
  const userData = await User.findOne({
    attributes: { exclude: ["password"] },
    where: { id: userID, is_active: true },
  });

  return userData;
};

module.exports = { userEdit };
