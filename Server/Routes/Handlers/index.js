const { userHandlerLogin } = require("./userHandlerLogin");
const { userHandlerRegister } = require("./userHandlerRegister");
const { ownerHandlerPost } = require("./ownerHandlerPost");
const { walkerHandlerPost } = require("./walkerHandlerPost");
const { userGetByIdHandler } = require("./userGetByIdHandler");
const { dogHandlerPost } = require("./dogHandlerPost");
const { dogHandlerGet } = require("./dogHandlerGet");
const { ownerHandlerGetAll } = require("./ownerHandlerGetAll");
const { walkHandlerPost } = require("./walkHandlerPost");

module.exports = {
  userHandlerLogin,
  userHandlerRegister,
  ownerHandlerPost,
  walkerHandlerPost,
  userGetByIdHandler,
  dogHandlerPost,
  dogHandlerGet,
  ownerHandlerGetAll,
  walkHandlerPost,
};
