const { userHandlerLogin } = require("./userHandlerLogin");
const { userHandlerRegister } = require("./userHandlerRegister");
const { userHandlerDeActivate } = require("./userHandlerDeActivate");
const { userHandlerActivate } = require("./userHandlerActivate");
const { userGetByIdHandler } = require("./userGetByIdHandler");
const { ownerHandlerDeActivate } = require("./ownerHandlerDeActivate");
const { ownerHandlerActivate } = require("./ownerHandlerActivate");
const { walkerHandlerActivate } = require("./walkerHandlerActivate");
const { walkerHandlerDeActivate } = require("./walkerHandlerDeActivate");
const { ownerHandlerGetAll } = require("./ownerHandlerGetAll");
const { ownerHandlerGetById } = require("./ownerHandlerGetById");
const { ownerHandlerPost } = require("./ownerHandlerPost");
const { dogHandlerGet } = require("./dogHandlerGet");
const { dogHandlerPost } = require("./dogHandlerPost");
const { walkerHandlerPost } = require("./walkerHandlerPost");
const { walkerHandlerGetAvailable } = require("./walkerHandlerGetAvailable");
const { walkerHandlerSetAvailable } = require("./walkerHandlerSetAvailable");
const { walkerHandlerGetById } = require("./walkerHandlerGetById");
const { walkerHandlerGetAll } = require("./walkerHandlerGetAll");
const { walkHandlerPost } = require("./walkHandlerPost");
const { walkHandlerGeAll } = require("./walkHandlerGeAll");
const { walkHandlerGetByWalker } = require("./walkHandlerGetByWalker");
const { walkHandlerGetByOwner } = require("./walkHandlerGetByOwner");
const { paymentHandlerPost } = require("./paymentHandlerPost");

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
  walkerHandlerGetAvailable,
  walkerHandlerSetAvailable,
  walkerHandlerGetById,
  walkerHandlerGetAll,
  walkHandlerPost,
  walkHandlerGeAll,
  walkHandlerGetByWalker,
  walkHandlerGetByOwner,
  ownerHandlerGetById,
  paymentHandlerPost,
};
