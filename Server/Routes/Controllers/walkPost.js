const {
  User,
  Walker,
  Owner,
  Dog,
  Walk,
  WalkType,
  Notification,
} = require("../../Database/db");
const { sendEmailNotification } = require("../utils/sendEmailNotification");
const { sendNotification } = require("./notificationFunctions");
const { walkGet } = require("./walkGet");

const walkPost = async (
  ownerId,
  walkerId,
  walkTypes,
  dogs,
  duration,
  totalPrice,
  paymentMethod
) => {
  const userOwner = await User.findByPk(ownerId);
  const userWalker = await User.findByPk(walkerId);

  if (!userOwner) {
    throw new Error(`Owner ${ownerId} not found`);
  }
  if (!userWalker) {
    throw new Error(`Walker ${walkerId} not found`);
  }

  const owner = await userOwner?.getOwner();
  const walker = await userWalker?.getWalker();

  if (!owner?.is_active || !walker?.is_active) {
    throw new Error("Walker or Owner not active");
  }

  const dogsCount = Array.isArray(dogs)
    ? dogs.length
    : typeof dogs === "number"
    ? dogs
    : 0;

  const newWalk = await Walk.create({
    date: new Date(),
    startTime: new Date().toLocaleTimeString(),
    duration: duration || 60,
    dogNumber: dogsCount,
    totalPrice,
    paymentMethod,
  });

  if (walkTypes) {
    newWalk.addWalkTypes(walkTypes);
  }

  await owner?.addWalk(newWalk);
  await walker?.addWalk(newWalk);

  if (Array.isArray(dogs)) {
    //si hay detalle de perros los agrego
    const ownerDogs = await owner?.getDogs();
    await Promise.all(
      ownerDogs?.map(async (dog) => {
        if (dogs.includes(dog?.id)) {
          await dog?.addWalk(newWalk);
        }
      })
    );
  }

  const walkData = await walkGet(null, newWalk?.id, null);

  let type = "walk";
  let subject = "Payment received";
  let message = `<p>Hi ${userOwner.name} <\p>
  <p>Payment received successfully! <\p>
  <p>WOOFER has received your payment for a walk request!  <\p>
  <p>Walk id: ${walkData[0]?.id}<\p>
  <p>Walker: ${walkData[0]?.walker.name}<\p>
  <p>Total amount is $ ${totalPrice}<\p>
  <p>Payment method: ${paymentMethod}<\p>
  <p>Enjoy!<\p>`;
  let email = userOwner.email;

  await sendNotification(userOwner, type, subject, message, true);

  subject = "WOOFER ADMIN: Payment received ";
  message = `<p>WOOFER has received a payment from ${walkData[0]?.owner.name} for a walk request!</p>
  <p>Walk id: ${walkData[0]?.id}</p>
  <p>Walker: ${walkData[0]?.walker.name}</p>
  <p>The total amount is $ ${totalPrice}</p>
  <p>Payment method: ${paymentMethod}<\p> `;

  sendEmailNotification(subject, "admin@woofer.com", message);

  type = "walk";
  subject = "You've got a Woofer walk || Services requested 🐕";
  message = `<p>Hi ${walkData[0]?.walker.name} </p>
  <p>Congrats!<\p>
  <p>You have a new walk request from ${walkData[0]?.owner.name}!<\p>
  <p>Date: ${walkData[0]?.date}<\p>
  <p>Time: ${walkData[0]?.startTime}<\p>
  <p>Duration: ${walkData[0]?.duration} minutes<\p>
  <p>Dogs: ${walkData[0]?.dogNumber}<\p>`;
  email = userWalker.email;

  await sendNotification(userWalker, type, subject, message, true);

  return walkData;
};

module.exports = { walkPost };
