const { User } = require("../../Database/db");

const ownerDeActivate = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("User doesn't exist");
  }
  user.isOwner = false;
  await user.save();

  const owner = await user.getOwner();

  if (!owner) {
    throw new Error("Owner doesn't exist");
  }
  owner.is_active = false;
  await owner.save();

  return "Owner was deactivated!";
};

module.exports = { ownerDeActivate };
