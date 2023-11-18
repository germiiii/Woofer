const { User, Walker, Owner, Dog } = require("../../Database/db");

const userGetbyId = async (id) => {
  
    const userData = await User.findOne({
      where: { id: id },
      attributes: [
        "id",
        "name",
        "email",
        "lastName",
        "username",
        "adress",
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
              attributes: ["name", "breed", "size", "age", "img"],
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

    return userData;

  };

module.exports = { userGetbyId };
