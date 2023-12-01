const { User, Walker } = require("../../Database/db");

const walkerGetAll = async () => {
  const allWalkers = await User.findAll({
    where: { is_active: true, isWalker: true },
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
        where: { is_active: true },
        attributes: [
          "dog_capacity",
          "dog_size",
          "walk_duration",
          "is_available",
        ],
      },
    ],
  });

  return allWalkers;
};

module.exports = {
  walkerGetAll,
};
