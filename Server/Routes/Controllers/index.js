const { userLogin } = require("./userLogin");
// const { userRegister } = require("./userRegister");
const { userActivate } = require("./userActivate");
const { userDeActivate } = require("./userDeActivate");
const { walkerActivate } = require("./walkerActivate");
const { walkerDeActivate } = require("./walkerDeActivate");
const { ownerActivate } = require("./ownerActivate");
const { ownerDeActivate } = require("./ownerDeActivate");
const { userGetbyId } = require("./userGetbyId");
const { ownerPost } = require("./ownerPost");
const { getDogs } = require("./getDogs");
const { ownerGetAll } = require("./ownerGetAll");
const { ownerGetById } = require("./ownerGetById");
const { walkerSetAvailable } = require("./walkerSetAvailable");
const { walkerPost } = require("./walkerPost");
const { walkerGetById } = require("./walkerGetById");
const { walkerGetAll } = require("./walkerGetAll");
const { walkPost } = require("./walkPost");
const { walkGetByWalker } = require("./walkGetByWalker");
const { walkGetByOwner } = require("./walkGetByOwner");
const { walkGetAll } = require("./walkGetAll");
const { PaymentController } = require("./PaymentController");
const { userEdit } = require("./userEdit");

module.exports = {
  userLogin,
  // userRegister,
  userDeActivate,
  userActivate,
  walkerActivate,
  walkerDeActivate,
  ownerActivate,
  ownerDeActivate,
  ownerPost,
  walkerPost,
  userGetbyId,
  getDogs,
  ownerGetAll,
  ownerGetById,
  walkerSetAvailable,
  walkerGetAll,
  walkerGetById,
  walkPost,
  walkGetAll,
  walkGetByWalker,
  walkGetByOwner,
  PaymentController,
  userEdit,
};
