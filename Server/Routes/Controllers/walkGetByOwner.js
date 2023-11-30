const { User, Walker, Owner, Dog, Walk } = require("../../Database/db");

const walkGetByOwner = async (ownerId) => {
  
  const walks = await Walk.findAll({
    include: [
      {
        model: Owner,
        where: { id: ownerId },
        include: [
          {
            model: User,
            attributes: ["name"],
          },
        ],
      },
      {
        model: Walker,
        include: [
          {
            model: User,
            attributes: ["name"],
          },
        ],
      },
      {
        model: Dog,
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
    ],
  });

  return walk;
};

module.exports = { walkGetByOwner };
