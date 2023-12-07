const { User, Walker, WalkType } = require("../../Database/db");

const walkerGetAll = async (province, is_available) => {
  const whereUser = { is_active: true, isWalker: true };
  const whereWalker = { is_active: true };
  if (is_available) {
    whereWalker["is_available"] = is_available;
  }

  if (province) {
    whereUser[["province"]] = province;
  }
  const allWalkers = await User.findAll({
    attributes: {
      exclude: [
        "password",
        "verificationToken",
        "resetPasswordToken",
        "resetPasswordExpires",
      ],
    },
    where: whereUser,
    include: [
      {
        model: Walker,
        where: whereWalker,
        attributes: [
          "dog_capacity",
          "dog_size",
          "walk_duration",
          "score",
          "sale_details",
          "is_available",
        ],
        include: [
          {
            model: WalkType,
            attributes: ["id", "title", "price", "description"],
            through: { attributes: [] },
          },
        ],
      },
    ],
  });
  return allWalkers;
};

module.exports = {
  walkerGetAll,
};
