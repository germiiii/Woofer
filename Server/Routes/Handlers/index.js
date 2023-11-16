const { userHandlerLogin } = require("./userHandlerLogin");
const { userHandlerRegister } = require('./userHandlerRegister')
const { ownerHandlerPost } = require('./ownerHandlerPost')

module.exports = {
  userHandlerLogin,
  userHandlerRegister,
  ownerHandlerPost
};
