const { Op } = require("sequelize");
const { User, Walker, Owner, Review, Walk } = require("../../Database/db");

const walkGet = async (id, idWalk, date) => {
  const whereDate = date ? { [Op.gte]: date } : {};
  let whereId = {};
  let whereIdWalk = {};

  if (id) {
    whereId = {
      [Op.or]: [
        { "$walker.user.id$": id },
        { "$owner.user.id$": id }
      ]
    };
  }

  if (idWalk) {
    whereIdWalk = { id: idWalk };
  }

  const allWalks = await Walk.findAll({
    where: JSON.parse(JSON.stringify({
      ...whereDate,
      ...whereId,
      ...whereIdWalk
    })),
    include: [
      {
        model: Owner,
        include: {
          model: User,
          attributes: ["id", "name", "lastName", "image"],
        },
      },
      {
        model: Walker,
        include: {
          model: User,
          attributes: ["id", "name", "lastName", "image"],
        },
      },
      {
        model: Review,
        attributes: ["id", "type", "score", "description"],
      },
    ],
    order: [["date", "ASC"]],
  });

  const allWalkData = allWalks.map((walk) => {
    const { walker, owner, reviews } = walk;

    return {
      id: walk.id,
      date: walk.date,
      startTime: walk.startTime,
      duration: walk.duration,
      dogNumber: walk.dogNumber,
      totalPrice: walk.totalPrice,
      paymentMethod: walk.paymentMethod,
      state: walk.state,
      hasOwnerReview: walk.hasOwnerReview,
      hasWalkerReview: walk.hasWalkerReview,
      owner: {
        name: `${owner.user.name} ${owner.user.lastName}`,
        image: owner.image,
        id: owner.userId,
      },
      walker: {
        name: `${walker.user.name} ${walker.user.lastName}`,
        image: walker.image,
        id: walker.userId,
      },
      reviews,
    };
  });

  return allWalkData;
};

module.exports = { walkGet }