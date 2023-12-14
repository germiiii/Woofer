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

  let message = `Hi ${userOwner.name} \n 
  We've received a payment via ${paymentMethod} of $ ${totalPrice} for your walk request!`;
  let type = "walk";
  let subject = "Payment received";
  let email = userOwner.email;

  await sendNotification(userOwner, type, subject, message, true);

  subject = "WOOFER ADMIN: Payment received";
  message = `WOOFER has received a payment from ${walkData[0]?.owner.name} for a walk request!\n
  Walk id: ${walkData[0]?.id},\n
  Walker: ${walkData[0]?.walker.name},\n
  The total amount is $ ${totalPrice}\n
  Payment method: ${paymentMethod}`;

  sendEmailNotification(subject, "admin@woofer.com", message);

  message = `You have a new walk request from ${walkData[0]?.owner.name}!\n
  Date: ${walkData[0]?.date},\n
  Time: ${walkData[0]?.startTime},\n
  Duration: ${walkData[0]?.duration} minutes,\n
  Dogs: ${walkData[0]?.dogNumber},\n
 `;
  type = "walk";
  subject = "You've got a ride to do";
  email = userWalker.email;

  await sendNotification(userWalker, type, subject, message, true);

  return walkData;
};

module.exports = { walkPost };
