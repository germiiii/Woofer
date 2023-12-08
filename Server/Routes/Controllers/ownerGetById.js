const { User, Owner, Dog } = require("../../Database/db");

const ownerGetById = async (id) => {
  const owner = await User.findByPk(id, {
    where: { is_active: true, isOwner: true },
    attributes: {
      exclude: [
        "password",
        "verificationToken",
        "resetPasswordToken",
        "resetPasswordExpires",
      ]},
    include: [
      {
        model: Owner,
        attributes: ["dog_count", "score", "reviews_count"],
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
