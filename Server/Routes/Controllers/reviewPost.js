const { User, Walker, Owner, Walk, Review } = require("../../Database/db");

const reviewPost = async ( idWalk, type, score, description) => {
  const walk = await Walk.findOne({
    where: { id: idWalk },
  });
  if (!walk) {
    throw new Error(`${user.username} don't have a walk to calificate`);
  }

  // const user = await User.findOne({
  //   where: { id: idUser, is_active: true },
  // });
  // if (!user) {
  //   throw new Error("User not found");
  // }

  const newReview = await Review.create({ type, score, description });

  let instancedUser = null;
  if (type === "owner") {
    instancedUser = await walk.getOwner();
    walk.hasOwnerReview = true;
  } else if (type === "walker") {
    instancedUser = await walk.getWalker();
    walk.hasWalkerReview = true;
  }
  if (!instancedUser) {
    throw new Error("Walker or Owner not found");
  }

  instancedUser.score += score;
  await instancedUser.save();

  walk.addReview(newReview);
  await walk.save();

  const reviewData = await Review.findOne({
    where: { id: newReview.id },
    include: [
      {
        model: Walk,
        include: [
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
            model: Owner,
            attributes: ["score"],
            include: [
              {
                model: User,
                attributes: ["name", "lastName"],
              },
            ],
          },
        ],
      },
    ],
  });

  return reviewData;
};

module.exports = { reviewPost };
