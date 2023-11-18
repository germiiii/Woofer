const { userHandlerLogin } = require("./userHandlerLogin");
const { userHandlerRegister } = require("./userHandlerRegister");
const { ownerHandlerPost } = require("./ownerHandlerPost");
const { walkerHandlerPost } = require("./walkerHandlerPost");
const { userGetByIdHandler } = require("./userGetByIdHandler");
const { dogHandlerPost } = require("./dogHandlerPost");

module.exports = {
  userHandlerLogin,
  userHandlerRegister,
  ownerHandlerPost,
  walkerHandlerPost,
  userGetByIdHandler,
  dogHandlerPost,
};
