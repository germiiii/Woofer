const { Dog, Owner } = require("../../Database/db");

const getDogs = async username => {
  const dogs = await Dog.findAll(username); //TODO : traer solo los perros del owner correspondiente, este ta mal
  return dogs;
};

module.exports = {
  getDogs,
};
