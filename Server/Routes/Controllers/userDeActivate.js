const { User } = require("../../Database/db");

const userDeActivate = async (id) => {

  const user = await User.findByPk(id);
  if (!user) throw Error("User doesnt exist");
  user.is_active = false;
  await user.save();
  return "User was desactivated!";
};

module.exports = { userDeActivate };
