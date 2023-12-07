const { Op } = require("sequelize");
const { User, Review, Owner, Dog, Walk } = require("../../Database/db");

const walkGetByOwner = async (ownerId, date) => {
  const whereDate = date ? { date: { [Op.gte]: date } } : {};

  const ownerWalkData = await User.findAll({
    attributes: ["id", "name", "lastName"],
    where : { id: ownerId, is_active: true },
    include: {
      model: Owner,
      attributes: ["score"],
      include: {
        model: Walk,
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
    },
  });

  return ownerWalkData;
};

module.exports = { walkGetByOwner };
