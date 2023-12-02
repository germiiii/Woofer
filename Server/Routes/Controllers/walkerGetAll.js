const { User, Walker } = require("../../Database/db");

const walkerGetAll = async (province, is_available, walkTypes) => {
  const whereUser = { is_active: true, isWalker: true };
  const whereWalker = { is_active: true };
  if (is_available) {
    whereWalker["is_available"] = is_available;
  }
  // if (walkTypes) {
  //   whereWalker: {
  //     walkTypes;
  //   }
  // }
  if (province) {
    whereUser[["province"]] = province;
  }
  const allWalkers = await User.findAll({
    attributes: { exclude: ["password"] },
    where: whereUser,
    include: [
      {
        model: Walker,
        where: whereWalker,
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
