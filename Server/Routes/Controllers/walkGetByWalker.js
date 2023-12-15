const { Op } = require("sequelize");
const { User, Walker, Review, Walk, Owner } = require("../../Database/db");

const walkGetByWalker = async (walkerId, date) => {

    const whereDate = date ? { date: { [Op.gte]: date } } : {};
  
    const walksFromWalker = await Walk.findAll({
      where: whereDate,
      include: [
        {
          model: Walker,
          where: {
            userId: walkerId,
          },
          include: {
            model: User,
            attributes: ["id", "name", "lastName", "image", "address", "city"],
          },
        },
        {
          model: Owner,
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
  
    if (!walksFromWalker) {
      throw new Error("Walker walks not found");
    }
  
    const walkerWalkData = walksFromWalker.map((walk) => {
      const { owner, reviews } = walk;
  
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
          name: owner.user.name + " " + owner.user.lastName,
          image: owner.image,
          address: owner.user.address, 
          city: owner.user.city,
          id: owner.userId,
        },
        reviews,
      };
      return walkInfo;
    });
  
    return walkerWalkData;
  };

module.exports = { walkGetByWalker };
