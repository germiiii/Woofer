const { User, Walker, WalkType } = require("../../Database/db");
const { sendEmailNotification } = require("../utils/sendEmailNotification");

const walkerPost = async (
  id,
  dog_capacity,
  dog_size,
  walk_duration,
  sale_details,
  is_available,
  walkTypes
) => {
  const user = await User.findOne({ where: { id, is_active: true } });
  if (!user) {
    throw new Error("User not found");
  }

  const newWalker = await Walker.create({
    dog_capacity,
    dog_size,
    walk_duration,
    sale_details,
    is_available,
  });

  if (walkTypes) {
    //chequear que los tipos existan
    await newWalker.setWalkTypes(walkTypes);
  }

  await user.setWalker(newWalker);

  await User.update({ isWalker: true }, { where: { id, is_active: true } });

  const userData = await User.findOne({
    attributes: {
      exclude: [
        "password",
        "verificationToken",
        "resetPasswordToken",
        "resetPasswordExpires",
      ],
    },
    where: { id },
    include: [
      {
        model: Walker,
        attributes: [
          "dog_capacity",
          "dog_size",
          "walk_duration",
          "score",
          "reviews_count",
          "sale_details",
          "is_available",
        ],
        include: [
          {
            model: WalkType,
          },
        ],
      },
    ],
  });
  const message = `<p>New Woofer walker has been registered!<\p>
  <img src=${userData.image} alt="User Image style="style="width: 5cm; height: auto;">
  <p>Name: ${userData.name} ${userData.lastName}<\p>
  <p>Email: ${userData.email}<\p>
  <p>Address: ${userData.address}<\p>
  <p>City: ${userData.city}<\p>
  <p>Province: ${userData.province}<\p>
  <p><\p>
  <p>Sale Details: ${userData.walker.sale_details}<\p>
  <p>Dog Capacity: ${userData.walker.dog_capacity}<\p>
  <p>Walk types: ${userData.walker.walkTypes.map(
    (walkType) => "<p>🐾 " + walkType.title + "<p>"
  )}`;

  sendEmailNotification(
    "ADMIN New Woofer Walker🐾 ",
    "admin@woofer.com",
    message
  );

  return userData;
};

module.exports = { walkerPost };
