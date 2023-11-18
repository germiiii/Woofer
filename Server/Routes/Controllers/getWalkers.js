const { Walker } = require("../../Database/db");

const getAvailableWalkers = async () => {
  try {
    const availableWalkers = await Walker.findAll({
      where: {
        is_available: true,
      },
    });
    return availableWalkers;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAvailableWalkers,
};