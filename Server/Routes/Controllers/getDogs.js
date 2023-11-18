const { Dog, Owner, User } = require("../../Database/db");

const getDogs = async username => {
  const user = await User.findOne({
    where: { username, is_active: true },
    include: {
      model: Owner,
      include: Dog,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }

  const dogs = user.Owner.Dogs; //? plural?
  return dogs; //* array de objetos con propiedades del modelo
};

module.exports = {
  getDogs,
};
