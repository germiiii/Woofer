const { User, Walker, Owner, Walk, Review, Notification } = require("../../Database/db");

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
  const user = await User.findByPk(instancedUser.userId);
  let mensaje = "";
  if (type === "owner") {
    mensaje = `Recibiste una calificacion de tu walker! ${reviewData.walk.walker.user.name} ${reviewData.walk.walker.user.lastName} te califico con ${score} y dejo este comentario: ${description}`;
    // enviarNotificacion(reviewData.walker.email, mensaje);
  } else if (type === "walker") {
    mensaje = `Recibiste una calificacion de tu paseo! ${reviewData.walk.owner.user.name} ${reviewData.walk.owner.user.lastName} te califico con ${score} y dejo este comentario: ${description}`;
    // enviarNotificacion(reviewData.owner.email, mensaje);
  }
  const notification = await Notification.create({
    message: mensaje,
    type: "review",
  });
  user.addNotification(notification);
  user.hasNotifications = true;
  await user.save();

  return reviewData;
};

module.exports = { reviewPost };
