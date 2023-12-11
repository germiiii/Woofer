const { User, Walker, WalkType } = require("../../Database/db");

const walkerPut = async (
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

  const walker = await Walker.findOne({ where: { userId: user.id } });
  if (!walker) {
    throw new Error("Walker not found");
  }

  // Update the walker's properties if the corresponding parameter has a value
  if (dog_capacity) {
    walker.dog_capacity = dog_capacity;
  }

  if (dog_size) {
    walker.dog_size = dog_size;
  }

  if (walk_duration) {
    walker.walk_duration = walk_duration;
  }

  if (sale_details) {
    walker.sale_details = sale_details;
  }

  if (is_available !== undefined) {
    walker.is_available = is_available;
  }

  if (walkTypes && walkTypes.length > 0) {
    // Check if walk types exist and update them
    const existingWalkTypes = await WalkType.findAll({
      where: { id: walkTypes },
    });

    if (existingWalkTypes.length !== walkTypes.length) {
      throw new Error("Invalid walk types");
    }

    await walker.setWalkTypes(walkTypes);
  }

  await walker.save();

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

  return userData;
};

module.exports = { walkerPut };
