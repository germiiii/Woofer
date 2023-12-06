const { User, Walker, WalkType } = require("../../Database/db");

const walkerPost = async (
  id,
  dog_capacity,
  dog_size,
  walk_duration,
  sale_details,
  is_available,
  walkTypes,
) => {
  const user = await User.findOne({ where: { id, is_active: true } });
  if (!user) {
    throw new Error("User not found");
  }

  const newWalker = await Walker.create({
    dog_capacity,
    dog_size,
    walk_duration,
    sale_details,
    is_available,
  });

  if (walkTypes) {//chequear que los tipos existan
    await newWalker.setWalkTypes(walkTypes);
  }

  await user.setWalker(newWalker);

  await User.update(
    { isWalker: true },
    { where: { id, is_active: true } }
  );

  const userData = await User.findOne({
    attributes: { exclude: ["password"] },
    where: { id },
    include: [
      {
        model: Walker,
        attributes: [
          "dog_capacity",
          "dog_size",
          "walk_duration",
          "is_available",
        ],
        include: [
          {
            model: WalkType,
          },
        ],
      },
    ],
  });

  return userData;
};

module.exports = { walkerPost };
