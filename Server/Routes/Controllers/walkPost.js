const { User, Walker, Owner, Dog, Walk, WalkType } = require("../../Database/db");

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
  const owner = await userOwner?.getOwner();

  const userWalker = await User.findByPk(walkerId);
  const walker = await userWalker?.getWalker();

  if (!owner || !walker || !owner.is_active || !walker.is_active) {
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
    startTime: new Date().toLocaleTimeString(),
    duration: duration || 60,
    dogNumber: dogsCount,
    totalPrice,
    paymentMethod,
  });

  newWalk.addWalkTypes(walkTypes);

  await owner.addWalk(newWalk, { through: Walk });
  await walker.addWalk(newWalk, { through: Walk });

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
        attributes: ["score"],
        include: [
          {
            model: User,
            attributes: ["name", "lastName"],
          },
        ],
      },
      {
        model: Walker,
        attributes: ["score"],
        include: [
          {
            model: User,
            attributes: ["name", "lastName"],
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

  return walk;
};

module.exports = { walkPost };
