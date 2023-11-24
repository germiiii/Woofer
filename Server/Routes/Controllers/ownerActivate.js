const { User } = require("../../Database/db");

const ownerActivate = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("User doesn't exist");
  }
  
  user.isOwner = true;
  await user.save();

  const owner = await user.getOwner();

  if (!owner) {
    throw new Error("Owner doesn't exist");
  }
  
  owner.is_active = true;
  await owner.save();
  
  return "Owner is now active!";
};

module.exports = { ownerActivate };
