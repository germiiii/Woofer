const { User, Walker, WalkType, Walk, Review } = require("../../Database/db");

const walkerGetById = async (id, date) => {
  const whereDate = date ? { date: { [Op.gte]: date } } : {};

  const walkerData = await User.findByPk(id, {
    where: { is_active: true, isWalker: true },
    attributes: {
      exclude: [
        "password",
        "verificationToken",
        "resetPasswordToken",
        "resetPasswordExpires",
      ],
    },
    include: [
      {
        model: Walker,
        where: { is_active: true },
        attributes: [
          // "dog_capacity",
          // "dog_size",
          // "walk_duration",
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
  const reviewsData = await Review.findAll({
    attributes: ["score", "description", "walkId"],
    where: { type: "walker" },
    include: {
      model: Walk,
      attributes: ["date"],
      where: { hasWalkerReview: true },
      include: {
        model: Walker,
        attributes: [],
      },
    },
  });
  return { walkerData, reviewsData };
};

module.exports = {
  walkerGetById,
};
