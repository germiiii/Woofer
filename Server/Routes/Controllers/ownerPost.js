const { User, Owner, Dog } = require("../../Database/db");

const ownerPost = async (id, dogs) => {
  const user = await User.findOne({ where: { id, is_active: true } });
  if (!user) {
    throw new Error("User not found");
  }

  const newOwner = await Owner.create({
    userId: id,
    dog_count: dogs.length,
  });

  const createdDogs = await Promise.all(
    dogs.map(async (dog) => {
      const createdDog = await Dog.create({
        ...dog,
        ownerId: newOwner.id,
      });
      return createdDog;
    })
  );

  await newOwner.addDogs(createdDogs);

  const userData = await User.findOne({
    where: { id: id },
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
            attributes: ['name','breed', 'size', 'age', 'img'],
            where: { is_active: true },
          },
        ],
      },
    ],
  });

  return userData;
};

module.exports = { ownerPost };
