const { User, Walker, Owner, Dog } = require("../../Database/db");

const userGetAll = async (role) => {
  // Fetch all users from the database

  let whereCondition = { is_active: true };

  if (role && role === "admin") {
    whereCondition = {}; //admin has access to all users
  }

  const users = await User.findAll({
    attributes: { exclude: ['password'] },
    where: whereCondition,
    include: [
      {
        model: Owner,
        where: whereCondition,
        include: [
          {
            model: Dog,
            attributes: ["id", "name", "breed", "size", "age", "img"]           
          },
        ],
        required: false, // Make Owner optional
      },
      {
        model: Walker,
        where: whereCondition,
        required: false, // Make Walker optional
      },
    ],
  });

  return users;
};

module.exports = { userGetAll };
