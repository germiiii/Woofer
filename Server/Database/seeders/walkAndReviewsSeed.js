const { User, Walk, Review, Notification } = require("../db");
const walkAndReviewsData = require("./walkAndReviewsData");
const {
  sendNotification,
} = require("../../Routes/Controllers/notificationFunctions");

const seedWalkAndReviews = async () => {
  try {
    console.log("SEEDING WALKS and REVIEWS...");
    for (const [index, walk] of walkAndReviewsData.entries()) {
      const { walkerUserName, ownerUserName, walkTypes, ...walkAttributes } = walk;

      const [walkerUser, ownerUser] = await Promise.all([
        User.findOne({ where: { username: walkerUserName } }),
        User.findOne({ where: { username: ownerUserName } }),
      ]);

      if (!ownerUser || !walkerUser) continue;

      const newWalk = await Walk.create(walkAttributes);
      const [walkerInstance, ownerInstance] = await Promise.all([
        walkerUser.getWalker(),
        ownerUser.getOwner(),
      ]);

      const [walkerWalkType] = await walkerInstance.getWalkTypes();
      await newWalk.addWalkTypes(walkerWalkType);

      await Promise.all([
        ownerInstance.addWalk(newWalk),
        walkerInstance.addWalk(newWalk),
      ]);

      const dogCapacity = walkerInstance.dog_capacity || 0;
      const dogsCount = walkAttributes.dogNumber || 0;

      await Promise.all([
        sendNotification(
          ownerUser,
          "payment",
          "Payment received",
          `We've received a payment via ${walkAttributes.paymentMethod} of $ ${walkAttributes.totalPrice} for your walk request!`,
          false
        ),
        sendNotification(
          walkerUser,
          "walk",
          "You've got a ride to do",
          `You have a new walk request from ${ownerUser.name} ${ownerUser.lastName}!`,
          false
        ),
      ]);

      walkerUser.dog_capacity_actual = dogCapacity - dogsCount;
      await walkerUser.save();

      if (walkAttributes.review) {
        const { type, score, description, date } = walkAttributes.review;
        newWalk.state = "Done";
        if (type === "owner") {
          newWalk.hasOwnerReview = true;
          ownerInstance.reviews_count += 1;
          ownerInstance.score += score;
          ownerInstance.save();
        } else {
          newWalk.hasWalkerReview = true;
          walkerInstance.reviews_count += 1;
          walkerInstance.score += score;
          walkerInstance.save();
        }
        const newReview = await Review.create({
          type,
          score,
          description,
          date,
          email: type === "owner" ? ownerUser.email : walkerUser.email,
        });
        newWalk.addReview(newReview);
        newWalk.save();

        if (type === "owner") {
          await sendNotification(
            ownerUser,
            "review",
            "You've received a rating",
            `You've received a rating from your dog walker! ${walkerUser.name} ${walkerUser.lastName} rated you with ${score} points and left this comment: ${description}`,
            false
          );
        } else {
          await sendNotification(
            walkerUser,
            "review",
            "You've received a rating",
            `You've received a rating from your dog walker! ${walkerUser.name} ${walkerUser.lastName} rated you with ${score} points and left this comment: ${description}`,
            false
          );
        }
      }

      if (walkAttributes.review){
        console.log(`${index}) Walker: ${walkerUser.email} // Owner: ${ownerUser.email} // Review: X`)
      } else {
        console.log(`${index}) Walker: ${walkerUser.email} // Owner: ${ownerUser.email}`)
      }
    }

    console.log("- Walks and reviews seeded successfully\n");
  } catch (error) {
    console.error("Error seeding walks and reviews:", error);
  }
};

module.exports = seedWalkAndReviews;
