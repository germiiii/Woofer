const { User, Owner, Dog } = require("../../Database/db");

const ownerGetAll = async () => {
  const userData = await User.findAll({
    attributes: { exclude: ['password'] },
    where: { isOwner: true, is_active: true },
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
