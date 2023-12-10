const { User, Walker, Owner, Walk, Review } = require("../../Database/db");

const reviewGet = async (id) => {
  const whereId = id ? { id, is_active: true } : { is_active: true };

  const reviewWalkerData = await User.findAll({
    attributes: ["id", "name", "lastName"],
    where: whereId,
    include: {
      model: Walker,
      attributes: ["score", "reviews_count"],
      where: { is_active: true },
      include: {
        model: Walk,
        attributes: ["date"],
        where: { hasWalkerReview: true },
        include: {
          model: Review,
          attributes: ["score", "description"],
          where: { type: "walker" },
        },
      },
    },
    order: [["username"]],
  });

  const reviewOwnerData = await User.findAll({
    attributes: ["id", "name", "lastName"],
    where: whereId,
    include: {
      model: Owner,
      attributes: ["score", "reviews_count"],
      where: { is_active: true },
      include: {
        model: Walk,
        attributes: ["date"],
        where: { hasOwnerReview: true },
        include: {
          model: Review,
          attributes: ["score", "description"],
          where: { type: "owner" },
        },
      },
    },
    order: [["username"]],
  });

  return [{ownerReviews: reviewOwnerData, walkerReviews: reviewWalkerData}];
};

module.exports = { reviewGet };
