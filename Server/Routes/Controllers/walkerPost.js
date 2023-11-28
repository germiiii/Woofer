const { User, Walker } = require("../../Database/db");

const walkerPost = async (username, dog_capacity, is_available) => {
  const user = await User.findOne({ where: { username, is_active: true } });
  if (!user) {
    throw new Error("User not found");
  }

  const newWalker = await Walker.create({
    dog_capacity,
    is_available,
  });

  await user.setWalker(newWalker);

  await User.update({ isWalker: true }, { where: { username, is_active: true } });

  const userData = await User.findOne({
    where: { username },
    attributes: [
      "id",
      "name",
      "email",
      "lastName",
      "username",
      "address",
      "image",
      "isWalker",
      "isOwner",
    ],
    include: [
      {
        model: Walker,
        attributes: ["dog_capacity", "is_available"],
      },
    ],
  });

  return userData;
};

module.exports = { walkerPost };
