const { Walker } = require("../../Database/db");

const getWalkers = async () => {
  try {
    const walkers = await Walker.findAll();
    return walkers;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getWalkers,
};