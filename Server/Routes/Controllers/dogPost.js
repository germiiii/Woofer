const { Dog, User, Owner } = require("../../Database/db.js");

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
      "adress",
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

module.exports = { dogPost };
