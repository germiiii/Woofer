const { User, Walker, Owner, Dog, Walk } = require("../../Database/db");

const walkPost = async (ownerId, walkerId, dogs, duration, totalPrice) => {
  const owner = await Owner.findOne({
    where: { userId: ownerId, is_active: true },
  });

  const walker = await Walker.findOne({
    where: { userId: walkerId, is_active: true },
  });

  if (!owner || !walker) {
    throw new Error("Walker or Owner not found");
  }

  const ownerDogs = await owner.getDogs();

  const newWalk = await Walk.create({
    date: new Date(),
    duration: duration || 60,
    totalPrice,
    dogNumber: dogs.length,
  });

  await owner.addWalk(newWalk, { through: Walk });
  await walker.addWalk(newWalk, { through: Walk });

  // Associate the walk with each dog in dogs
  await Promise.all(
    ownerDogs.map(async (dog) => {
      if (dogs.includes(dog.id)) {
        await dog.addWalk(newWalk);
      }
    })
  );

 const walk = await Walk.findOne({
   where: { id: newWalk.id },
   include: [
     {
       model: Owner,
       include: [
         {
           model: Dog,
           attributes: ["id", "name"],
           through: { attributes: [] },
           where: { '$Walks.id$': newWalk.id },
         },
        //  {
        //    model: User,
        //    attributes: ["name"],
        //  },
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
   ],
 });

  return walk;
};

module.exports = { walkPost };
