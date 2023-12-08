const { Op } = require("sequelize");
const { User, Walker, Owner, Review, Walk } = require("../../Database/db");

const walkGetAll = async (date) => {
  const whereDate = date ? { date: { [Op.gte]: date } } : {};

  const walkData = await Walk.findAll({
    attributes: [
      "date",
      "startTime",
      "duration",
      "dogNumber",
      "totalPrice",
      "paymentMethod",
      "state",
    ],
    where: whereDate,
    include: [
      {
        model: Walker,
        attributes: ["score", "reviews_count"],
        include: {
          model: User,
          attributes: ["id", "name", "lastName"],
        },
      },
      {
        model: Owner,
        attributes: ["score", "reviews_count"],
        include: {
          model: User,
          attributes: ["id", "name", "lastName"],
        },
      },
      {
        model: Review,
        attributes: ["type", "score", "description"],
        required: false,
      },
    ],
  });

  return [walkData];
};

module.exports = { walkGetAll };
