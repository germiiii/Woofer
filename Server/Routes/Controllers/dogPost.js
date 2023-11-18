const { Dog, User, Owner } = require("../../Database/db.js");

const dogPost = async (username, dogs) => {
  // validations
  if (!username) {
    throw new Error("Username is required");
  }
  if (!listOfDogs) {
    throw new Error("Dogs are required");
  }

  const user = await User.findOne({ where: { username, is_active: true } });
  if (!user) {
    throw new Error("User not found");
  } //TODO : deberia buscar la instancia de Owner y no de user

  // create the dog
  const newDog = await Dog.bulkCreate(dogs);

  // asociate the dogs with the owner
  await User.addDogs(createdDogs); // ! mal, no es User, es Owner

  if (newDog) {
    return newDog;
  }
};

module.exports = dogPost;
