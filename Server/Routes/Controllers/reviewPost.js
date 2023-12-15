const {
  User,
  Walker,
  Owner,
  Walk,
  Review,
  Notification,
} = require("../../Database/db");
const moment = require("moment");
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

  const formattedDate = new Date(reviewData.walk.date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
  );

  const formattedTime = moment(reviewData.walk.startTime, "HH:mm:ss").format("hh:mm A");

  let message = "";
  let subject = "";
  if (type === "owner") {
    subject = "You have been rated ⭐";
    message = `You've received a rating from your dog walker! ${reviewData.walk.walker.user.name} ${reviewData.walk.walker.user.lastName} rated you with ${score} points and left this comment: 
    ${description}
        
    Walk Date: ${formattedDate} Time: ${formattedTime} Duration: ${reviewData.walk.duration} minutes.
    Id walk: ${reviewData.walk.id}`;
  } else if (type === "walker") {
    subject = "Your services have been rated ⭐";
    message = `Hi ${reviewData.walk.walker.user.name}!
    You've received a rating for your service! 
     ${reviewData.walk.owner.user.name} ${reviewData.walk.owner.user.lastName} rated you with ${score} Woofer stars and left you a comment:
     ${description}
     
     You have a total of ${reviewData.walk.walker.reviews_count} reviews and a total of ${reviewData.walk.walker.score} Woofer stars
     
     Walk Date: ${formattedDate} Time: ${formattedTime} Duration: ${reviewData.walk.duration} minutes.
     Id walk: ${reviewData.walk.id}`;
     
  }

  const user = await User.findByPk(instancedUser.userId);
  await sendNotification(user, "review", subject, message, true);

  return reviewData;
};

module.exports = { reviewPost };
