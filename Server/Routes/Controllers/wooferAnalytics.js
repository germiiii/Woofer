const { Sequelize } = require("sequelize");

const {
  User,
  Walker,
  Owner,
  Review,
  Walk,
  Dog,
  WalkType,
  walkTypeWalk,
} = require("../../Database/db");

const wooferAnalytics = async () => {
  try {
    const [ownerCount, walkerCount, walkCount, walkTypeCount] =
      await Promise.all([
        Owner.count(),
        Walker.count(),
        Walk.count(),
        WalkType.count(),
      ]);

      const totalPays = await Walk.findAll({
        attributes: [
          'paymentMethod',
          [Sequelize.fn('SUM', Sequelize.col('totalPrice')), 'totalPays']
        ],
        group: 'paymentMethod'
      });
  
      const formattedTotalPays = totalPays.map(payment => ({
        totalPays: `$ ${payment.dataValues.totalPays}`,
        paymentMethod: payment.dataValues.paymentMethod
      }));

    const owners = await Owner.findAll({
      include: [
        {
          model: User,
          attributes: ["name", "lastName", "image"],
        },
        Walk,
      ],
    });

    const ownerWalkCounts = owners.map((owner) => ({
      id: owner.userId,
      name: `${owner.user.name} ${owner.user.lastName}`,
      count: owner.walks.length,
    }));
    
    let ownersWithMostWalks = ownerWalkCounts
    .sort((a, b) => b.count - a.count)
    .slice(0, 1);
    
    ownersWithMostWalks = ownersWithMostWalks[0];
    const mostRatedWalker = await Walker.findOne({
      attributes: ["userId", "score", "reviews_count"],
      order: [
        ["score", "DESC"],
        ["reviews_count", "DESC"],
      ],
    });

    const analyticsResults = {
      ownerCount,
      walkerCount,
      walkTypeCount,
      walkCount,
      totalPays,
      ownersWithMostWalks,
      mostRatedWalker,
    };

    return analyticsResults;
  } catch (error) {
    console.error("Error in analytics:", error);
    throw error;
  }
};

module.exports = { wooferAnalytics };
