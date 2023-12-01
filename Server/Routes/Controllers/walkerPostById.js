const { User, Walker } = require("../../Database/db");

const walkerPost = async (
  id,
  dog_capacity,
  dog_size,
  walk_duration,
  is_available
) => {
  const user = await User.findOne({ where: { id, is_active: true } });
  if (!user) {
    throw new Error("User not found");
  }

  const newWalker = await Walker.create({
    dog_capacity,
    dog_size,
    walk_duration,
    is_available,
  });

  await user.setWalker(newWalker);

  await User.update({ isWalker: true }, { where: { id, is_active: true } });

  const userData = await User.findOne({
    where: { id },
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
        model: Walker,
        // attributes: ["dog_capacity", "is_available"],
      },
    ],
  });

  return userData;
};

module.exports = { walkerPost };
