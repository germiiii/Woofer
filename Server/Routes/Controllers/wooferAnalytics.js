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
    const [ownerCount, walkerCount, walkCount, walkTypeCount, totalPays] =
      await Promise.all([
        Owner.count(),
        Walker.count(),
        Walk.count(),
        WalkType.count(),
        Walk.sum("totalPrice"),
      ]);
    const formattedTotalPays = totalPays
      ? `Total: $ ${totalPays.toFixed(2)}`
      : "Total: $ 0.00";
    const totalGroupPays = await Walk.findAll({
      attributes: [
        "paymentMethod",
        [Sequelize.fn("SUM", Sequelize.col("totalPrice")), "totalPays"],
      ],
      group: "paymentMethod",
    });

    const formattedTotalGroupPays = totalGroupPays.reduce((result, payment) => {
      const paymentMethod = payment.dataValues.paymentMethod || "";
      const totalPaysValue = `$ ${payment.dataValues.totalPays}`;
      return {
        ...result,
        [paymentMethod]: totalPaysValue,
      };
    }, {});
    const paypalPays = formattedTotalGroupPays.paypal || "0";
    const alternativePays = formattedTotalGroupPays.alternative || "0";
    const mercadopagoPays = formattedTotalGroupPays.mercadopago || "0";

    const owners = await Owner.findAll({
      include: [
        {
          model: User,
          attributes: ["name", "lastName", "image"],
        },
        Walk,
      ],
    });

    const ownerWalkCounts = owners
      .filter((owner) => owner.walks.length > 0) // Filter owners with at least one walk
      .map((owner) => ({
        id: owner.userId,
        name: `${owner.user?.name} ${owner.user?.lastName}`,
        count: owner.walks.length,
      }));

    const maxWalkCount = Math.max(
      ...ownerWalkCounts.map((owner) => owner.count)
    ); // Find the maximum walk count

    let ownersWithMostWalks = ownerWalkCounts
      .filter((owner) => owner.count === maxWalkCount) // Filter owners with the maximum walk count
      .map((owner) => `${owner.name} (${owner.count} walks)`);

    ownersWithMostWalks = `Owners with most walks: ${ownersWithMostWalks[0]}`;

    const mostRatedWalker = await Walker.findOne({
      attributes: ["userId", "score", "reviews_count"],
      order: [
        ["score", "DESC"],
        ["reviews_count", "DESC"],
      ],
      include: [
        {
          model: User,
          attributes: ["name", "lastName", "image"],
        },
      ],
    });
    const formattedMostRatedWalker = `Most rated walker: ${mostRatedWalker.user.name} ${mostRatedWalker.user.lastName} (${mostRatedWalker.reviews_count} reviews, ${mostRatedWalker.score} Woofer stars)`;

    const analyticsResults = {
      ownerCount: `Owners: ${ownerCount}`,
      walkerCount: `Walkers: ${walkerCount}`,
      walkCount: `Walks: ${walkCount}`,
      formattedTotalPays,
      paypalPays: `-> Paypal: ${paypalPays}`,
      alternativePays: `-> Alternative: ${alternativePays}`,
      mercadopagoPays: `-> MP: ${mercadopagoPays}`,
      ownersWithMostWalks,
      formattedMostRatedWalker
    };

    return analyticsResults;
  } catch (error) {
    console.error("Error in analytics:", error);
    throw error;
  }
};

module.exports = { wooferAnalytics };
