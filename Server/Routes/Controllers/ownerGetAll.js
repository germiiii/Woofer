const { User, Owner, Dog } = require("../../Database/db");

const ownerGetAll = async (province) => {
  const whereUser = { is_active: true, isOwner: true };
  if (province) {
    whereUser[["province"]] = province;
  }
  const userData = await User.findAll({
    attributes: { exclude: ["password"] },
    where: whereUser,
    include: [
      {
        model: Owner,
        attributes: ["dog_count"],
        include: [
          {
            model: Dog,
            attributes: ["name", "breed", "size", "age", "img"],
            where: { is_active: true },
          },
        ],
      },
    ],
  });

  return userData;
};

module.exports = {
  ownerGetAll,
};
