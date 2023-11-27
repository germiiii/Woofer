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

// upload image function
const uploadImage = async imagePath => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    // console.log(result);
    return result.secure_url;
  } catch (error) {
    console.error(error);
  }
};

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
    const result = await uploadImage(file.path);
    file = result;
  }

  // create
  const newOwner = await Owner.create({
    dog_count: 1, //! ver esto
  });

  const createdDog = await Dog.Create({
    name,
    breed,
    size,
    age,
    img: file,
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
    where: { username: username, is_active: true },
    attributes: [
      "id",
      "name",
      "email",
      "lastName",
      "username",
      "address",
      "isWalker",
      "isOwner",
    ],
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
