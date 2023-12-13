const { Op } = require("sequelize");
const { User, Walker, Review, Walk, Owner } = require("../../Database/db");

const walkGetByWalker = async (walkerId, date) => {
  const whereDate = date ? { date: { [Op.gte]: date } } : {};

  const walkerWalkData = await User.findAll({
    attributes: ["id", "name", "lastName"],
    where: { id: walkerId, is_active: true },
    include: {
      model: Walker,
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
        // where: whereDate,
        include: {
          model: Review,
          attributes: ["score", "description"],
          where: { type: "walker" },
          required: false,
        },
      },
      include: {
        model: Owner,
        attributes: ["score", "reviews_count"],
        include: {
          model: User,
          attributes: ["id", "name", "lastName", "image"],
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
