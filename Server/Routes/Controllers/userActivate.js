const { User } = require("../../Database/db");

const userActivate = async (id) => {
  
    const user = await User.findByPk(id);
    if(!user) throw Error("User doesnt exist")
    user.is_active = true
    await user.save()
    return "User is now active!"

  };

module.exports = { userActivate };
