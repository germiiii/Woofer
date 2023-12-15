const { Op } = require("sequelize");
const { User, Review, Owner, Dog, Walk, Walker } = require("../../Database/db");

const walkGetByOwner = async (ownerId, date) => {
  const whereDate = date ? { date: { [Op.gte]: date } } : {};

  const walksFromOwner = await Walk.findAll({
    where: whereDate,
    include: [
      {
        model: Owner,
        where: {
          userId: ownerId,
        },
        include: {
          model: User,
          attributes: ["id", "name", "lastName", "image", "address", "city"],
        },
      },
      {
        model: Walker,
        include: {
          model: User,
          attributes: ["id", "name", "lastName", "image", "address", "city"],
        },
      },
      {
        model: Review,
        attributes: ["id", "type", "score", "description"],
      },
    ],
    order: [["date", "ASC"]],
  });

  if (!walksFromOwner) {
    throw new Error("Owner walks not found");
  }

  const ownerWalkData = walksFromOwner.map((walk) => {
    const { walker, reviews } = walk;

    const walkInfo = {
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
      walker: {
        name: walker.user.name + " " + walker.user.lastName,
        image: walker.image,
        address: walker.user.address, 
        city: walker.user.city,
        id: walker.userId,
      },
      reviews,
    };
    return walkInfo;
  });

  return ownerWalkData;
};

module.exports = { walkGetByOwner };
