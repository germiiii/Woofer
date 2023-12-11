const walkAndReviewsData = [
  {
    walkerUserName: "janesmith",
    ownerUserName: "anamuhall",
    date: new Date("2023-10-21"),
    startTime: new Date().toLocaleTimeString(),
    state: "done",
    duration: "15",
    dogNumber: 1,
    totalPrice: 30,
    paymentMethod: "mercadopago",
    review: {
      type: "walker",
      score: 4,
      description: "The dog walker was very friendly and attentive to my dog.",
      date: "2023-10-28",
    },
  },
  {
    walkerUserName: "janesmith",
    ownerUserName: "anamuhall",
    date: new Date("2023-11-21"),
    startTime: new Date().toLocaleTimeString(),
    state: "inProgress",
    duration: "30",
    dogNumber: 1,
    totalPrice: 30,
    state: "done",
    paymentMethod: "mercadopago",
  },
  {
    walkerUserName: "martinmanrique",
    ownerUserName: "anamuhall",
    date: new Date("2023-11-21"),
    startTime: new Date().toLocaleTimeString(),
    state: "done",
    duration: "15",
    dogNumber: 2,
    totalPrice: 30,
    paymentMethod: "paypal",
    review: {
      type: "walker",
      score: 2,
      description:
        "The dog walker was late and didn’t seem very interested in their job.",
      date: "2023-10-22",
    },
  },
  {
    walkerUserName: "martinmanrique",
    ownerUserName: "anamuhall",
    date: new Date(),
    startTime: new Date().toLocaleTimeString(),
    state: "inProgress",
    duration: "15",
    dogNumber: 2,
    totalPrice: 30,
    paymentMethod: "paypal",
    review: {
      type: "walker",
      score: 2,
      description:
        "The dog walker was late and didn’t seem very interested in their job.",
      date: "2023-10-22",
    },
  },
  {
    walkerUserName: "sofialugat",
    ownerUserName: "juanlopez",
    date: new Date("2023-10-20"),
    startTime: new Date().toLocaleTimeString(),
    state: "done",
    duration: "60",
    dogNumber: 2,
    totalPrice: 30,
    paymentMethod: "paypal",
    review: {
      type: "walker",
      score: 5,
      description:
        "The dog walker was very professional and made sure my dog was comfortable at all times.",
      date: "2023-10-22",
    },
  },
  {
    walkerUserName: "carlosgonzalez",
    ownerUserName: "juangarcia",
    date: new Date("2023-10-10"),
    startTime: new Date().toLocaleTimeString(),
    state: "done",
    duration: "15",
    dogNumber: 2,
    totalPrice: 30,
    paymentMethod: "paypal",
    review: {
      type: "walker",
      score: 1,
      description:
        "The dog walker didn’t seem to have much experience and didn’t know how to handle my dog.",
      date: "2023-10-11",
    },
  },

  {
    walkerUserName: "anaperez",
    ownerUserName: "juangarcia",
    date: new Date("2023-10-16"),
    startTime: new Date().toLocaleTimeString(),
    state: "done",
    duration: "15",
    dogNumber: 2,
    totalPrice: 30,
    paymentMethod: "paypal",
    review: {
      type: "walker",
      score: 1,
      description:
        "The dog walker didn’t seem to have much experience and didn’t know how to handle my dog.",
      date: "2023-10-17",
    },
  },
];
//   username: "sofiarodriguez",
//   username: "martinfernandez",

const seedWalkAndReviews = async (User, Walk, Review, Notification) => {
  try {
    for (const walk of walkAndReviewsData) {
      const { walkerUserName, ownerUserName, walkTypes, ...walkAttributes } =
        walk;

      const walkerUser = await User.findOne({
        where: { username: walkerUserName },
      });
      const ownerUser = await User.findOne({
        where: { username: ownerUserName },
      });

      if (!ownerUser || !walkerUser) {
        continue;
      }

      const newWalk = await Walk.create(walkAttributes);
      const walkerInstance = await walkerUser.getWalker();
      const ownerInstance = await ownerUser.getOwner();

      const [walkerWalkType] = await walkerInstance.getWalkTypes();
      await newWalk.addWalkTypes(walkerWalkType);

      await ownerInstance.addWalk(newWalk);
      await walkerInstance.addWalk(newWalk);

      const dogCapacity = walkerInstance.dog_capacity || 0;
      const dogsCount = walkAttributes.dogNumber || 0;

      //notificaciones
      //al owner
      let mensaje = `Recibimos tu pago mediante ${walkAttributes.paymentMethod} de $ ${walkAttributes.totalPrice} por tu paseo!`;
      let notification = await Notification.create({
        message: mensaje,
        type: "payment",
      });
      ownerUser.addNotification(notification);
      ownerUser.hasNotifications = true;
      await ownerUser.save();

      //al walker
      mensaje = `Tenes un nuevo paseo para realizar del usuario ${walkerUser.name} ${walkerUser.lastName}!`;
      notification = await Notification.create({
        message: mensaje,
        type: "walk",
      });
      walkerUser.addNotification(notification);
      walkerUser.hasNotifications = true;
      walkerUser.dog_capacity_actual = dogCapacity - dogsCount;
      await walkerUser.save();

      if (walkAttributes.review) {
        const { type, score, description, date } = walkAttributes.review;
        newWalk.state = "done";
        if (type === "owner") {
          newWalk.hasOwnerReview = true;
          ownerInstance.reviews_count += 1;
          ownerInstance.score += score;
          ownerInstance.save();
        } else {
          newWalk.hasWalkerReview = true;
          walkerInstance.reviews_count += 1;
          walkerInstance.score += score;
          walkerInstance.save();
        }
        const newReview = await Review.create({
          type,
          score,
          description,
          date,
        });
        newWalk.addReview(newReview);
        newWalk.save();
      }
    }
    console.log("- Walks and reviews seeded successfully");
  } catch (error) {
    console.error("Error seeding walks and reviews:", error);
  }
};

module.exports = seedWalkAndReviews;
