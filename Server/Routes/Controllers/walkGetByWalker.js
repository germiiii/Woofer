const { Op } = require("sequelize");
const { User, Walker, Review, Walk } = require("../../Database/db");

const walkGetByWalker = async (walkerId, date) => {
  const whereDate = date ? { date: { [Op.gte]: date } } : {};

  const walkerWalkData = await User.findAll({
    attributes: ["id", "name", "lastName"],
    where : { id: walkerId, is_active: true },
    include: {
      model: Walker,
      attributes: ["score", "reviews_count"],
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
        // where: whereDate,
        include: {
          model: Review,
          attributes: ["score", "description"],
          where: { type: "owner" },
          required: false,
        },
      },
    },
  });

  return walkerWalkData;

  // const walks = await Walk.findAll({
  //   where: { walkerId },
  //   include: [
  //     {
  //       model: Walker,
  //       // attributes: [], 
  //       include: [
  //         {
  //           model: User,
  //           attributes: ["name", "lastName"],
  //         },
  //       ],
  //     },
  //     {
  //       model: Owner,
  //       // attributes: [], 
  //       include: [
  //         {
  //           model: User,
  //           attributes: ["name", "lastName"],
  //         },
  //       ],
  //     },
  //     {
  //       model: Dog,
  //       attributes: ["id", "name"],
  //       through: { attributes: [] },
  //     },
  //   ],
  // });

  // return walks;
};

module.exports = { walkGetByWalker };
