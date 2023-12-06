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
const { validateSpecialAndNumber } = require("../../Routes/utils/validations");
const { uploadImage } = require("../../Routes/utils/uploadImage");

const userEdit = async (data, file) => {
  const { userID, name, lastname, username, adress, city, province } = data;

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
    if (typeof username === "string" && username.length < 20) {
      User.update(
        { username: username },
        {
          where: { id: userID, is_active: true },
        }
      );
    } else {
      throw new Error("Error en el username");
    }
  }

  if (name) {
    if (
      typeof name === "string" &&
      name.length < 20 &&
      validateSpecialAndNumber(name)
    ) {
      User.update(
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
      lastname.length < 35 &&
      validateSpecialAndNumber(lastname)
    ) {
      User.update(
        { lastname: lastname },
        {
          where: { id: userID, is_active: true },
        }
      );
    } else {
      throw new Error("Error en el apellido");
    }
  }

  if (adress) {
    if (typeof adress === "string" && adress.length < 25) {
      User.update(
        { adress: adress },
        {
          where: { id: userID, is_active: true },
        }
      );
    } else {
      throw new Error("Error en la dirección");
    }
  }

  if (city) {
    if (
      typeof city === "string" &&
      city.length < 40 &&
      validateSpecialAndNumber(city)
    ) {
      User.update(
        { city: city },
        {
          where: { id: userID, is_active: true },
        }
      );
    } else {
      throw new Error("Error en la ciudad");
    }
  }

  if (province) {
    if (
      typeof province === "string" &&
      province.length < 30 &&
      validateSpecialAndNumber(province)
    ) {
      User.update(
        { province: province },
        {
          where: { id: userID, is_active: true },
        }
      );
    } else {
      throw new Error("Error en la provincia");
    }
  }

  if (file) {
    await uploadImage(file.path);
    User.update({ image: file.path });
  }

  const userData = await User.findOne({
    attributes: { exclude: ["password"] },
    where: { id: userID, is_active: true },
    include: [
      {
        model: Owner,
        attributes: ["dog_count"],
        include: [
          {
            model: Dog,
            attributes: ["name", "breed", "size", "age", "img"],
            where: { is_active: true },
          },
        ],
      },
    ],
  });

  return userData;
};

module.exports = { userEdit };
