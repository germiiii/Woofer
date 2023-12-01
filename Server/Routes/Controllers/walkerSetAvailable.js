const { User, Walker } = require("../../Database/db");

const walkerSetAvailable = async (id, is_available) => {
  // const user = await User.findByPk(id, {
  //   include: Walker,
  // });

  const user = await User.findByPk(id);

  const walker = await user.getWalker();

  if (user && walker) {
    walker.is_available = is_available;
    await walker.save();
    if (is_available) return "Walker is now available!";
    else return "Walker is now unavailable!";
  } else {
    console.log("No walker found for the user.");
  }
};

module.exports = { walkerSetAvailable };
