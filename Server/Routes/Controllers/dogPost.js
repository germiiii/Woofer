const { Dog, User, Owner } = require("../../Database/db.js");

const dogPost = async (username, dogs) => {
  // validations
  if (!username) {
    throw new Error("Username is required");
  }
  if (!listOfDogs) {
    throw new Error("Dogs are required");
  }

  // find the user and owner
  const user = await User.findOne({
    where: { username, is_active: true },
    include: {
      model: Owner,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }

  // create the dog
  const createdDogs = await Dog.bulkCreate(dogs);

  // asociate the dogs with the owner
  await user.Owner.addDogs(createdDogs); //? ok?

  if (newDog) {
    return newDog;
  }
};

module.exports = dogPost;
