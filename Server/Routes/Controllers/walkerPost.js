const { User, Walker } = require("../../Database/db");

const walkerPost = async (id, dog_capacity) => {
  const user = await User.findOne({ where: { id, is_active: true } });
  if (!user) {
    throw new Error("User not found");
  }

   await Walker.create({
    userId: id,
    dog_capacity: dog_capacity,
  });

  await User.update({ isWalker: true }, {
    where: { id, is_active: true },
  });

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
        model: Walker,
        attributes: ["dog_capacity", "is_available"]        
      },
    ],
  });

  return userData;
};

module.exports = { walkerPost };
