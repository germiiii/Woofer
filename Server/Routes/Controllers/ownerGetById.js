const { User, Owner, Dog } = require("../../Database/db");

const ownerGetById = async (id) => {
  const owner = await User.findByPk(id, {
    where: { is_active: true, isOwner: true },
    attributes: { exclude: ["password"] },
    include: [
      {
        model: Owner,
        attributes: ["dog_count"],
        include: [
          {
            model: Dog,
            // attributes: ["name", "breed", "size", "age", "img"],
            where: { is_active: true },
          },
        ],
      },
    ],
  });
  return owner;
};

module.exports = {
  ownerGetById,
};