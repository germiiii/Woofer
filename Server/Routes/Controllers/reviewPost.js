const {
  User,
  Walker,
  Owner,
  Walk,
  Review,
  Notification,
} = require("../../Database/db");
const { sendNotification } = require("./notificationFunctions");

const reviewPost = async (idWalk, type, score, description) => {
  const walk = await Walk.findOne({
    where: { id: idWalk },
  });

  if (!walk) {
    throw new Error(`${idWalk} id walk not found`);
  }

  const newReview = await Review.create({ type, score, description });

  let instancedUser = null;
  if (type === "owner") {
    instancedUser = await walk.getOwner();
    walk.hasOwnerReview = true;
  } else if (type === "walker") {
    instancedUser = await walk.getWalker();
    walk.hasWalkerReview = true;
  }

  if (!instancedUser) {
    throw new Error("Walker or Owner not found");
  }

  instancedUser.reviews_count += 1;
  instancedUser.score += score;
  await instancedUser.save();

  walk.addReview(newReview);
  await walk.save();

  const reviewData = await Review.findOne({
    where: { id: newReview.id },
    attributes: ["type", "score", "description"],
    include: [
      {
        model: Walk,
        include: [
          {
            model: Walker,
            attributes: ["score", "reviews_count"],
            include: [
              {
                model: User,
                attributes: ["id", "name", "lastName", "email"],
              },
            ],
          },
          {
            model: Owner,
            attributes: ["score", "reviews_count"],
            include: [
              {
                model: User,
                attributes: ["id", "name", "lastName", "email"],
              },
            ],
          },
        ],
      },
    ],
  });

  // enviar notificacion
  const user = await User.findByPk(instancedUser.userId);
  let message = "";
  let subject = "You've received a rating";
  if (type === "owner") {
    message = `You've received a rating from your dog walker! ${reviewData.walk.walker.user.name} ${reviewData.walk.walker.user.lastName} rated you with ${score} points and left this comment: ${description}`;
    await sendNotification(user, "review", subject, message, true);
  } else if (type === "walker") {
    message = `You've received a rating for your ride! ${reviewData.walk.walker.user.name} ${reviewData.walk.owner.user.lastName} rated you with ${score} points and left this comment: ${description}`;
    await sendNotification(user, "review", subject, email, true);
  }

  return reviewData;
};

module.exports = { reviewPost };
