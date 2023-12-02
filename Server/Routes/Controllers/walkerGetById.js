const { User, Walker } = require("../../Database/db");

const walkerGetById = async (id) => {
  const walker = await User.findByPk(id, {
    where: { is_active: true, isWalker: true },
    attributes: { exclude: ["password"] },
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

  return walker;
};

module.exports = {
  walkerGetById,
};
