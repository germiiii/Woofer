const { User, Walker } = require("../../Database/db");

const walkerPost = async (
  username,
  dog_capacity,
  dog_size,
  walk_duration,
  is_available
) => {
  const user = await User.findOne({ where: { username, is_active: true } });
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

  await User.update(
    { isWalker: true },
    { where: { username, is_active: true } }
  );

  const userData = await User.findOne({
    where: { username },
    include: [
      {
        model: Walker,
        attributes: [
          "dog_capacity",
          "dog_size",
          "walk_duration",
          "is_available",
        ],
      },
    ],
  });

  return userData;
};

module.exports = { walkerPost };
