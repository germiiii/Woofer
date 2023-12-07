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

const ownerPost = async (data, file) => {
  const { userID, name, size, age, breed } = data;
  let newOwner;

  // validations
  if (!userID) {
    throw new Error("userID is required");
  }
  if (!name || !size || !age || !breed) {
    throw new Error("Dog info is required");
  }
  const user = await User.findOne({ where: { id: userID, is_active: true } });
  if (!user) {
    throw new Error("User not found");
  }

  // upload image
  if (file) {
    await uploadImage(file.path);
  }

  const createdDog = await Dog.Create({
    name,
    breed,
    size,
    age,
    img: file.path,
  });

  if (!user.isOwner) {
    // create
    newOwner = await Owner.create({
      dog_count: 1, // se inicializa en 1
    });

    // asociation
    await user.setOwner(newOwner);

    await newOwner.addDogs(createdDog);

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
    await owner.addDogs(createdDog);

    // update dog count
    await owner.update({ dog_count: owner.dog_count + 1 });
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

module.exports = { ownerPost };
