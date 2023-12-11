const { User, Owner, Dog } = require("../../Database/db");
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
const { validateSpecialAndNumber } = require("../../Routes/utils/validations");

const ownerPost = async (data, file) => {
  const { userID, name, size, age, breed } = data;
  let newDog;
  let newOwner;

  // validations
  if (!userID) {
    throw new Error("userID is required");
  }
  if (!name || !size || !age || !breed) {
    throw new Error("Dog info is required");
  } else {
    // name validations
    if (typeof name !== "string") {
      throw new Error("Name debe ser string");
    }
    if (name.length > 40) {
      throw new Error("Name debe ser menor a 40 caracteres");
    }
    if (!validateSpecialAndNumber(name)) {
      throw new Error("Name no puede contener ni números ni símbolos");
    }

    // age validations
    // if (typeof age !== "number") {
    //   throw new Error("Age debe ser string");
    // } COMENTADA PORQUE LA EDAD SE MANDA COMO STRING
    if (age < 0 || age > 25) {
      throw new Error("Age debe ser entre 0 y 25");
    }

    // breed validations
    if (typeof breed !== "string") {
      throw new Error("Breed debe ser string");
    }
    if (breed.length > 40) {
      throw new Error("Breed debe ser menor a 40 caracteres");
    }
    if (!validateSpecialAndNumber(breed)) {
      throw new Error("Breed no puede contener ni números ni símbolos");
    }
  }
  const user = await User.findOne({ where: { id: userID, is_active: true } });
  if (!user) {
    throw new Error("User not found");
  }

  // upload image and create
  if (file) {
    await uploadImage(file.path);

    newDog = await Dog.create({
      name,
      breed,
      size,
      age,
      img: file.path,
    });
  } else {
    newDog = await Dog.create({
      name,
      breed,
      size,
      age,
      img: "https://static.vecteezy.com/system/resources/previews/012/777/450/non_2x/cat-or-dog-paw-footprint-concept-silhouette-icon-vector.jpg",
    });
  }

  if (!user.isOwner) {
    // create
    newOwner = await Owner.create({
      dog_count: 1, // se inicializa en 1
    });

    // asociation
    await user.setOwner(newOwner);

    await newOwner.addDogs(newDog);

    // update isOwner
    await User.update(
      { isOwner: true },
      {
        where: { id: userID, is_active: true },
      }
    );
  } else if (user.isOwner) {
    const owner = await Owner.findOne({
      where: { userId: user.id, is_active: true },
    });
    if (!owner) {
      throw new Error("Owner not found");
    }

    // asociate the dogs with the owner
    await owner.addDogs(newDog);

    // update dog count
    await owner.update({ dog_count: owner.dog_count + 1 });
  }

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

module.exports = { ownerPost };
