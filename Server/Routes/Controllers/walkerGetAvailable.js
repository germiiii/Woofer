const { User, Walker, WalkType } = require("../../Database/db");

const getAvailableWalkers = async () => {
  try {
    const availableWalkers = await User.findAll({
      attributes: { exclude: ["password"] },
      where: { is_active: true },

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
          include: [
            {
              model: WalkType,
            },
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
