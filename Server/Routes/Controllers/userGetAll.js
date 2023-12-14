const { User, Walker, Owner, Dog } = require("../../Database/db");

const userGetAll = async (role, email) => {
  let whereConditionUser = { is_active: true, role: "user" };
  let whereCondition = { is_active: true };

  if (role && role === "admin") {
    whereCondition = {};
    whereConditionUser = {};
  }
  
  if (email) {
    whereConditionUser.email = email;
  }

  const users = await User.findAll({
    attributes: {
      exclude: [
        "password",
        "verificationToken",
        "resetPasswordToken",
        "resetPasswordExpires",
      ],
    },
    where: whereConditionUser,
    include: [
      {
        model: Owner,
        where: whereCondition,
        include: [
          {
            model: Dog,
            attributes: [
              "id",
              "name",
              "breed",
              "size",
              "age",
              "img"
            ],
          },
        ],
        required: false,
      },
      {
        model: Walker,
        where: whereCondition,
        required: false,
      },
    ],
    order: [["username", "ASC"]],
  });

  return users;
};

module.exports = { userGetAll };
