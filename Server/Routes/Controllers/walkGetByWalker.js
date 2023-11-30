const { User, Walker, Owner, Dog, Walk } = require("../../Database/db");

const walkGetByWalker = async (walkerId) => {
  
  const walks = await Walk.findAll({
    include: [
      {
        model: Walker,
        where: { id: walkerId },
        include: [
          {
            model: User,
            attributes: ["name"],
          },
        ],
      },
      {
        model: Owner,
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

module.exports = { walkGetByWalker };
