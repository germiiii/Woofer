const { Dog, Owner, User } = require("../../Database/db");

const getDogs = async username => {
  const user = await User.findOne({
    where: { username, is_active: true },
  });
  if (!user) {
    throw new Error("User not found");
  }

  const owner = await Owner.findOne({
    where: { userId: user.id, is_active: true },
  });
  if (!owner) {
    throw new Error("Owner not found");
  }

  const dogs = await Dog.findAll({
    where: { ownerId: owner.id, is_active: true },
    attributes: ["name", "breed", "size", "age", "img"],
  });
  if (!dogs) {
    throw new Error("Dogs not found");
  }

  return dogs;
};

module.exports = {
  getDogs,
};
