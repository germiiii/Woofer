const { User, Walk, Walker, Owner } = require("../../Database/db");
const { sendNotification } = require("./notificationFunctions");
const { sendEmailNotification } = require("../utils/sendEmailNotification");
const moment = require("moment");

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

  const formattedDate = new Date(walk.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const formattedTime = moment(walk.startTime, "HH:mm:ss").format("hh:mm A");

  let message = "";
  switch (state) {
    case "Done":
      message = `<p>Hi ${ownerUser.name}!<\p> 
      <p>I'm ${walkerUser.name} ${walkerUser.lastName}, I would love to hear your opinion on the dog walk.<\p>
      <p> Please click on the link to give the walk a review:<\p>
      <p> ${process.env.NEXT_PUBLIC_APIURL}/ownerReviews/${walk.id}.
      <p><\p>
      <p>🐾 Thank you for your time!<\p>
      <p>Walk Date: ${formattedDate} Time: ${formattedTime} Duration: ${walk.duration} minutes.<\p>
      <p>Id walk: ${walk.id}<\p>`;
      sendNotification(
        ownerUser,
        "walk",
        "Woofer Walk Finished 🐶",
        message,
        true
      );
      break;
    case "In progress":
      message = `<p>Hi ${ownerUser.name}!<\p> 
      <p>Your walk No. ${walk.id} has started!<\p>`;
      sendNotification(
        ownerUser,
        "walk",
        "Woofer Walk in progress 🐾",
        message,
        true
      );
      break;
    case "Rejected":
      message = `<p>Hi ${ownerUser.name}! <\p>
      <p>Your walk No. ${walk.id} was rejected! <\p>
      <p>We'll contact you with further information to receive a refund..<\p>`;
      sendNotification(
        ownerUser,
        "walk",
        "Woofer Walk Rejected 🛑",
        message,
        true
      );
      message = `<p>The walk No. ${walk.id} was rejected! <\p>
      <p>Walker: ${walkerUser.name} ${walkerUser.lastName}<\p>
      <p>Owner: ${ownerUser.name} ${ownerUser.lastName}<\p>
      <p>Walk Date: ${formattedDate} Time: ${formattedTime} Duration: ${walk.duration} minutes.<\p>
      <p>Id walk: ${walk.id}<\p>`;
      sendEmailNotification(
        "ADMIN Woofer Walk Rejected 🛑",
        "admin@woofer.com",
        message
      );
      break;
    case "Pending":
      message = `<p>Hi ${ownerUser.name}!<\p>
      <p> Your walk No. ${walk.id} is pending. Woofer will get in touch soon with further information.<\p>`;
      sendNotification(
        ownerUser,
        "walk",
        "Woofer Pending Walk ⌛",
        message,
        true
      );
      break;
    default:
      break;
  }

  const walkData = await Walk.findByPk(id);

  return walkData;
};

module.exports = { walkUpdateState };
