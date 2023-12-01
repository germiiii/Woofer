const { Dog, User, Owner } = require("../../Database/db.js");
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

const dogPost = async (data, file) => {
  const { username, name, size, age, breed } = data;

  // validations
  if (!username) {
    throw new Error("Username is required");
  }
  if (!name || !size || !age || !breed) {
    throw new Error("Dogs are required");
  }

  // find the user
  const user = await User.findOne({
    where: { username, is_active: true },
  });
  if (!user) {
    throw new Error("User not found");
  }

  // find the owner
  const owner = await Owner.findOne({
    where: { userId: user.id, is_active: true },
  });
  if (!owner) {
    throw new Error("Owner not found");
  }

  // upload image
  if (file) {
    await uploadImage(file.path);
  }

  // create
  const createdDog = await Dog.create({
    name,
    breed,
    size,
    age,
    img: file.path,
  });

  // asociate the dogs with the owner
  await owner.addDogs(createdDog);

  // update dog count
  await owner.update({ dog_count: owner.dog_count + 1 });

  // data to return
  const userData = await User.findOne({
    where: { username: username, is_active: true },

    include: [
      {
        model: Owner,
        attributes: ["dog_count"],
        include: [
          {
            model: Dog,
            attributes: ["id", "name", "breed", "size", "age", "img"],
            where: { is_active: true },
          },
        ],
      },
    ],
  });

  return userData;
};

module.exports = { dogPost };
