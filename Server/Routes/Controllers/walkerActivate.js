const { User } = require("../../Database/db");

const walkerActivate = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User doesn't exist");
    user.isWalker = true;
    await user.save();

    const walker = await user.getWalker();
    if (!walker) throw new Error("Walker doesn't exist");
    walker.is_active = true;
    await walker.save();

    return "Walker is now active!";
  } catch (error) {
    throw error;
  }
};

module.exports = { walkerActivate };
