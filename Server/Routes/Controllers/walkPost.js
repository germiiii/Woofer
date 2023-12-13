const {
  User,
  Walker,
  Owner,
  Dog,
  Walk,
  WalkType,
  Notification,
} = require("../../Database/db");
const { sendNotification } = require("./notificationFunctions");

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

  const walkData = await Walk.findOne({
    where: { id: newWalk?.id },
    include: [
      {
        model: Owner,
        attributes: ["score", "reviews_count"],
        include: [
          {
            model: User,
            attributes: ["name", "lastName", "email"],
          },
        ],
      },
      {
        model: Walker,
        attributes: ["score", "reviews_count"],
        include: [
          {
            model: User,
            attributes: ["name", "lastName", "email"],
          },
        ],
      },
      {
        model: WalkType,
        attributes: ["title"],
        through: { attributes: [] },
      },
      {
        model: Dog,
        attributes: ["id", "name"],
        through: { attributes: [] },
        required: false,
      },
    ],
  });

  let message = `We've received a payment via ${paymentMethod} of $ ${totalPrice} for your walk request!`;
  let type = "walk";
  let subject = "Payment received";
  let email = userOwner.email;

  await sendNotification(userOwner, type, subject, message, true);

  message = `You have a new walk request from ${walkData?.owner.user.name} ${walkData?.owner.user.lastName}!`;
  type = "walk";
  subject = "You've got a ride to do";
  email = userWalker.email;

  await sendNotification(userWalker, type, subject, message, true);

  return walkData;
};

module.exports = { walkPost };
