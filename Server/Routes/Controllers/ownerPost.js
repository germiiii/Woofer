const { User, Owner, Dog } = require("../../Database/db");

const ownerPost = async (username, dogs) => {
  // validations
  if (!username) {
    throw new Error("Username is required");
  }
  if (!dogs) {
    throw new Error("Dogs are required");
  }
  const user = await User.findOne({ where: { username, is_active: true } });
  if (!user) {
    throw new Error("User not found");
  }

  const newOwner = await Owner.create({
    // userId: user.id,
    dog_count: dogs.length,
  });

  const createdDogs = await Dog.bulkCreate(dogs);

  // asociate the dogs with the owner
  await newOwner.addDogs(createdDogs);

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

module.exports = { ownerPost };
