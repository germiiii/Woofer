const { User, Walk, Walker, Owner } = require("../../Database/db");
const { sendNotification } = require("./notificationFunctions");

const walkUpdateState = async (id, state) => {
  const walk = await Walk.findByPk(id);
  if (!walk) {
    throw new Error("Walk not found");
  }

  if (walk.state === state) {
    throw new Error("Walk already in that state");
  }

  walk.state = state;
  await walk.save();

  const ownerUser = await User.findOne({
    include: {
      model: Owner,
      where: { id: walk.ownerId },
      attributes: [],
    },
  });
  const walkerUser = await User.findOne({
    attributes: ["name", "lastName"],
    include: {
      model: Walker,
      where: { id: walk.walkerId },
      attributes: [],
    },
  });
  let message = "";
  switch (state) {
    case "Done":
      message = `Hi ${ownerUser.name}! I'm ${walkerUser.name} ${walkerUser.lastName}, I would love to hear your opinion about the ride.\n
    Please click on the link to leave a review: ${process.env.NEXT_PUBLIC_APIURL}/walkerHome/TestOwnerReviews/${walk.id}.\n
    Thank you for your time!`;
      sendNotification(ownerUser, "walk", "Walk finished", message, true);
    case "In progress":
      message = `Hi ${ownerUser.name}! Your walk No. ${walk.id} has been started!`;
      sendNotification(ownerUser, "walk", "Walk in progress", message, true);
    case "Rejected":
      message = `Hi ${ownerUser.name}! Your walk No. ${walk.id} was rejected! We'll contact you soon to solve the issue.`;
      sendNotification(ownerUser, "walk", "Walk rejected", message, true);
    case "Pending":
      message = `Hi ${ownerUser.name}! Your walk No. ${walk.id} is pending again. We'll contact you soon.`;
      sendNotification(ownerUser, "walk", "Walk pending", message, true);
    default:
      break;
  }

  const walkData = await Walk.findByPk(id);

  return walkData;
};

module.exports = { walkUpdateState };
