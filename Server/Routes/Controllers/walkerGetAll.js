const { User, Walker } = require("../../Database/db");

const walkerGetAll = async () => {
  const allWalkers = await User.findAll({
    attributes: { exclude: ['password'] },
    where: { is_active: true, isWalker: true },

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
