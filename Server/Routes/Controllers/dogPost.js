const { Dog, User } = require("../../Database/db.js");

const dogPost = async (username, dogs) => {
  // validations
  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }
  if (!listOfDogs) {
    return res.status(400).json({ message: "List of dogs is required" });
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
