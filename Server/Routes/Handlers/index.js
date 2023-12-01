const { userHandlerLogin } = require("./userHandlerLogin");
const { userHandlerRegister } = require("./userHandlerRegister");
const { ownerHandlerPost } = require("./ownerHandlerPost");
const { walkerHandlerPost } = require("./walkerHandlerPost");
const { userGetByIdHandler } = require("./userGetByIdHandler");
const { dogHandlerPost } = require("./dogHandlerPost");
const { dogHandlerGet } = require("./dogHandlerGet");
const { ownerHandlerGetAll } = require("./ownerHandlerGetAll");
const { userHandlerActivate } = require("./userHandlerActivate");
const { userHandlerDeActivate } = require("./userHandlerDeActivate");
const { ownerHandlerDeActivate } = require("./ownerHandlerDeActivate");
const { ownerHandlerActivate } = require("./ownerHandlerActivate");
const { walkerHandlerActivate } = require("./walkerHandlerActivate");
const { walkerHandlerDeActivate } = require("./walkerHandlerDeActivate");
const { walkerHandlerSetAvailable } = require("./walkerHandlerSetAvailable");
const { walkerHandlerGetAll } = require("./walkerHandlerGetAll");
const { walkHandlerPost } = require("./walkHandlerPost");
const { walkHandlerGeAll } = require("./walkHandlerGeAll");
const { walkHandlerGetByWalker } = require("./walkHandlerGetByWalker");
const { walkHandlerGetByOwner } = require("./walkHandlerGetByOwner");

module.exports = {
  userHandlerLogin,
  userHandlerRegister,
  ownerHandlerPost,
  walkerHandlerPost,
  userGetByIdHandler,
  dogHandlerPost,
  dogHandlerGet,
  ownerHandlerGetAll,
  userHandlerActivate,
  userHandlerDeActivate,
  ownerHandlerDeActivate,
  ownerHandlerActivate,
  walkerHandlerActivate,
  walkerHandlerDeActivate,
  walkerHandlerSetAvailable,
  walkerHandlerGetAll,
  walkHandlerPost,
  walkHandlerGeAll,
  walkHandlerGetByWalker,
  walkHandlerGetByOwner
};
