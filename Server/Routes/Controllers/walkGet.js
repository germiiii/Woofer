const { Op, literal } = require("sequelize");
const { User, Walker, Owner, Review, Walk } = require("../../Database/db");

const walkGet = async (id, idWalk, minDate) => {
  const whereId = id
    ? {
        [Op.or]: [{ "$walker.user.id$": id }, { "$owner.user.id$": id }],
      }
    : {};
  const whereIdWalk = idWalk ? { id: idWalk } : {};
  const whereDate = minDate ? { date: { [Op.gte]: minDate } } : {};

  const allWalks = await Walk.findAll({
    where: {
      ...whereId,
      ...whereIdWalk,
      ...whereDate,
    },
    include: [
      {
        model: Owner,
        include: [
          {
            model: User,
            attributes: ["id", "name", "lastName", "image", "address", "city"],
          },
        ],
      },
      {
        model: Walker,
        include: [
          {
            model: User,
            attributes: ["id", "name", "lastName", "image", "address", "city"],
          },
        ],
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
        image: owner.user.image, // Modify this line
        address: owner.user.address, 
        city: owner.user.city,
        id: owner.userId,
      },
      walker: {
        name: `${walker.user.name} ${walker.user.lastName}`,
        image: walker.user.image, // Modify this line
        address: walker.user.address, 
        city: walker.user.city,
        id: walker.userId,
      },
      reviews,
    };
  });

  return allWalkData;
};

module.exports = { walkGet };
