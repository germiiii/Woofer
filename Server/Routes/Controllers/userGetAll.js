const { User, Walker, Owner, Dog } = require("../../Database/db");

const userGetAll = async () => {
  // Fetch all users from the database
  const users = await User.findAll({
    attributes: [
      "id",
      "name",
      "email",
      "lastName",
      "username",
      "address",
      "isWalker",
      "isOwner",
    ],
    include: [
      {
        model: Owner,
        attributes: ["dog_count"],
        include: [
          {
            model: Dog,
            attributes: ["id","name", "breed", "size", "age", "img"],
            where: { is_active: true },
          },
        ],
      },
      {
        model: Walker,
        attributes: ["dog_capacity", "is_available"],
      },
    ],
  });
  return users;
};

module.exports = { userGetAll };
