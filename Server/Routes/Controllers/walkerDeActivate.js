const { User } = require("../../Database/db");

const walkerDeActivate = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("User doesn't exist");
  }

  user.isWalker = false;
  await user.save();

  const walker = await user.getWalker();
  if (!walker) {
    throw new Error("Walker doesn't exist");
  }

  walker.is_active = false;
  await walker.save();

  return "Walker was deactivated!";
};

module.exports = { walkerDeActivate };
