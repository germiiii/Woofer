const { User, Walker, Owner, Dog } = require("../../Database/db");

const userGetAll = async () => {
  // Fetch all users from the database
  const users = await User.findAll({
    where: { is_active: true },
    attributes: [
      "id",
      "name",
      "email",
      "lastName",
      "username",
      "address",
      "image",
      "isWalker",
      "isOwner",
    ],
    include: [
      {
        model: Owner,
        where: { is_active: true },
        attributes: ["dog_count"],
        include: [
          {
            model: Dog,
            attributes: ["id", "name", "breed", "size", "age", "img"],
            where: { is_active: true },
          },
        ],
        required: false, // Make Owner optional
      },
      {
        model: Walker,
        where: { is_active: true },
        // attributes: ["dog_capacity", "is_available"],
        required: false, // Make Walker optional
      },
    ],
  });
  return users;
};

module.exports = { userGetAll };
