const { User, Walker, Owner, Dog, Walk } = require("../../Database/db");

const walkPost = async (
  ownerId,
  walkerId,
  walkTypes,
  dogs,
  duration,
  totalPrice,
  paymentMethod
) => {
  const owner = await Owner.findOne({
    where: { userId: ownerId, is_active: true },
  });

  const walker = await Walker.findOne({
    where: { userId: walkerId, is_active: true },
  });

  if (!owner || !walker) {
    throw new Error("Walker or Owner not found");
  }

  let dogsCount = 0;
  if (Array.isArray(dogs)) {
    dogsCount = dogs.length;
  } else if (typeof dogs === "number") {
    dogsCount = dogs;
  } else {
    throw new Error("Dogs is neither an array nor a number");
  }

  const newWalk = await Walk.create({
    date: new Date(),
    startTime: new Date().toLocaleTimeString(), //obtengo la hora actual
    duration: duration || 60,
    dogNumber: dogsCount,
    totalPrice,
    paymentMethod,
  });

  newWalk.addWalkTypes(walkTypes);

  await owner.addWalk(newWalk, { through: Walk });
  await walker.addWalk(newWalk, { through: Walk });

  //si hay un array de dogs los guardo en la info del paseo
  if (Array.isArray(dogs)) {
    const ownerDogs = await owner.getDogs();
    await Promise.all(
      ownerDogs.map(async (dog) => {
        if (dogs.includes(dog.id)) {
          await dog.addWalk(newWalk);
        }
      })
    );
  }

  const walk = await Walk.findOne({
    where: { id: newWalk.id },
    include: [
      {
        model: Owner,
        include: [
          {
            model: User,
            attributes: ["name"],
          },
        ],
      },
      {
        model: Walker,
        include: [
          {
            model: User,
            attributes: ["name"],
          },
        ],
      },
      {
        model: Dog,
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
    ],
  });

  return walk;
};

module.exports = { walkPost };
