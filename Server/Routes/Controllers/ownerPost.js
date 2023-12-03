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
  const { username, name, size, age, breed } = data;

  // validations
  if (!username) {
    throw new Error("Username is required");
  }
  if (!name || !size || !age || !breed) {
    throw new Error("Dogs are required");
  }
  const user = await User.findOne({ where: { username, is_active: true } });
  if (!user) {
    throw new Error("User not found");
  }
  if (user.isOwner) {
    throw new Error("Owner already exists");
  }

  // upload image
  if (file) {
    await uploadImage(file.path);
  }

  // create
  const newOwner = await Owner.create({
    dog_count: 1, // se inicializa en 1
  });

  const createdDog = await Dog.Create({
    name,
    breed,
    size,
    age,
    img: file.path,
  });

  // asociation
  await newOwner.addDogs(createdDog);

  await user.setOwner(newOwner);

  await User.update(
    { isOwner: true },
    {
      where: { username, is_active: true },
    }
  );

  const userData = await User.findOne({
    attributes: { exclude: ['password'] },
    where: { username: username, is_active: true },
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
