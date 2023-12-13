const { Op } = require("sequelize");
const { User, Walker, Owner, Review, Walk } = require("../../Database/db");

const walkGet = async (id, date) => {
  const where = {};

  if (id) {
    where.id = id;
  }

  if (date) {
    where.date = { [Op.gte]: date };
  }

  const walkData = await Walk.findAll({
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
    where,
    include: [
      {
        model: Walker,
        attributes: ["score", "reviews_count"],
        include: {
          model: User,
          attributes: ["id", "name", "lastName", "image"],
        },
      },
      {
        model: Owner,
        attributes: ["score", "reviews_count"],
        include: {
          model: User,
          attributes: ["id", "name", "lastName", "image"],
        },
      },
      {
        model: Review,
        attributes: ["type", "score", "description"],
        required: false,
      },
    ],
  });

  return walkData;
};

module.exports = { walkGet };
