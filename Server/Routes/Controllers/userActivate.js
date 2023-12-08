const { User } = require("../../Database/db");

const userActivate = async (id) => {
  
    const user = await User.findByPk(id);
    if(!user) throw Error("User doesnt exist")
    user.is_active = true
    await user.save()

    const owner = await user.getOwner();
    if (owner) {
      owner.is_active = true;
      await owner.save();
    }
    
    const walker = await user.getWalker();
    if (walker) {
      walker.is_active = true;
      await walker.save();
    }

    return `User ${user.username} is now active!`

  };

module.exports = { userActivate };
