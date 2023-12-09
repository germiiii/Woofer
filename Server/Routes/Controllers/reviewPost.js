const { User, Walker, Owner, Walk, Review } = require("../../Database/db");

const reviewPost = async (idWalk, type, score, description) => {
  const walk = await Walk.findOne({
    where: { id: idWalk },
  });

  if (!walk) {
    throw new Error(`${idWalk} id walk not found`);
  }

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

  instancedUser.reviews_count += 1;
  instancedUser.score += score;
  await instancedUser.save();

  walk.addReview(newReview);
  await walk.save();

  const reviewData = await Review.findOne({
    where: { id: newReview.id },
    attributes: ["type", "score", "description"],
    include: [
      {
        model: Walk,
        include: [
          {
            model: Walker,
            attributes: ["score", "reviews_count"],
            include: [
              {
                model: User,
                attributes: ["id", "name", "lastName", "email"],
              },
            ],
          },
          {
            model: Owner,
            attributes: ["score", "reviews_count"],
            include: [
              {
                model: User,
                attributes: ["id", "name", "lastName", "email"],
              },
            ],
          },
        ],
      },
    ],
  });

  // enviar notificacion
  // let mensaje = "";
  // if (type === "owner") {
  //   mensaje = `Recibiste una calificacion de tu walker! ${reviewData.walker.name} ${reviewData.walker.lastName} te califico con ${score} y dejo este comentario: ${description}`;
  //   enviarNotificacion(reviewData.walker.email, mensaje);
  // } else if (type === "walker") {
  //   mensaje = `Recibiste una calificacion de tu paseo! ${reviewData.owner.name} ${reviewData.owner.lastName} te califico con ${score} y dejo este comentario: ${description}`;
  //   enviarNotificacion(reviewData.owner.email, mensaje);
  // }

  return reviewData;
};

module.exports = { reviewPost };
