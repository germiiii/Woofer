const { User } = require("../../Database/db");

const userDeActivate = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("User doesn't exist");
  }

  const isAdmin = await User.count({
    where: { role: "admin", is_active: true },
  });

  if (isAdmin === 1 && user.role === "admin") {
    throw new Error("Cannot deactivate the last admin");
  }

  user.is_active = false;
  await user.save();

  const owner = await user.getOwner();
  if (owner) {
    owner.is_active = false;
    await owner.save();
  }

  const walker = await user.getWalker();
  if (walker) {
    walker.is_active = false;
    await walker.save();
  }

  return `User ${user.username} was deactivated!`;
};

module.exports = { userDeActivate };
