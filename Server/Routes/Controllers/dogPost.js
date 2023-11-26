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

const dogPost = async (username, dogs) => {
  // validations
  if (!username) {
    throw new Error("Username is required");
  }
  if (!dogs) {
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
  for (const dog of dogs) {
    if (dog.img) {
      const result = await uploadImage(dog.img);
      dog.img = result;
    }
  }

  // create the dog
  const createdDogs = await Dog.bulkCreate(dogs);

  // asociate the dogs with the owner
  await owner.addDogs(createdDogs);

  // update dog count
  await owner.update({ dog_count: createdDogs.length + owner.dog_count });

  // data to return
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
