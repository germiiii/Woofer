const { Op } = require("sequelize");
const { User, Review, Owner, Dog, Walk, Walker } = require("../../Database/db");

const walkGetByOwner = async (ownerId, date) => {
  const whereDate = date ? { date: { [Op.gte]: date } } : {};

  const ownerWalkData = await User.findAll({
    attributes: ["id", "name", "lastName"],
    where: { id: ownerId, is_active: true },
    include: {
      model: Owner,
      attributes: ["score", "reviews_count"],
      include: {
        model: Walk,
        attributes: [
          "id",
          "date",
          "startTime",
          "duration",
          "dogNumber",
          "totalPrice",
          "paymentMethod",
          "hasWalkerReview",
          "hasOwnerReview",
          "state",
        ],
        where: whereDate,
        // include:
        //     {
        //       model: Dog,
        //       attributes: ["id", "name"],
        //       through: { attributes: [] },
        //       required: false,
        //     },
        include: {
          model: Review,
          attributes: ["score", "description"],
          where: { type: "owner" },
          required: false,
        },
      },
      include: {
        model: Walker,
        attributes: ["score", "reviews_count"],
        include: {
          model: User,
          attributes: ["id", "name", "lastName", "image"],
        },
      },
    },
  });

  return ownerWalkData;
};

module.exports = { walkGetByOwner };
