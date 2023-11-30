const { User, Walker } = require("../../Database/db");

const getAvailableWalkers = async () => {
  try {
    const availableWalkers = await User.findAll({
      where: { is_active: true },
      attributes: [
        "id",
        "name",
        "email",
        "lastName",
        "username",
        "address",
        "image",
        "isWalker",
        "isOwner",
      ],
      include: [
        {
          model: Walker,
          where: { is_available: true, is_active: true },
          attributes: [
            "dog_capacity",
            "dog_size",
            "walk_duration",
            "is_available",
          ],
        },
      ],
    });
    return availableWalkers;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAvailableWalkers,
};
