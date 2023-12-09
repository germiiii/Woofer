const {
  User,
  Walker,
  Owner,
  Dog,
  Walk,
  WalkType,
} = require("../../Database/db");

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
    throw new Error(`Owner${ownerId} not found`);
  }
  if (!userWalker) {
    throw new Error(`Walker ${walkerId} not found`);
  }
  
  const owner = await userOwner?.getOwner();
  const walker = await userWalker?.getWalker();

  if (!owner?.is_active || !walker?.is_active) {
    throw new Error("Walker or Owner not actives");
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

  // const mensaje = `Recibimos un pago mediante ${paymentMethod} de $ ${totalPrice} por tu paseo!`;
  // enviarNotificacion(walkData?.owner?.email, mensaje);

  return walkData;
};

module.exports = { walkPost };
