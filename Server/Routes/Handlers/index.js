const { userHandlerLogin } = require("./userHandlerLogin");
const { userHandlerRegister } = require('./userHandlerRegister')
const { userHandlerChangePassword } = require ('./passwordHandlerChange')

module.exports = {
  userHandlerLogin,
  userHandlerRegister
};
