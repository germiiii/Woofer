const { userLogin } = require("./userLogin");
// const { userRegister } = require("./userRegister");
const { ownerPost } = require("./ownerPost");
const { dogPost } = require("./dogPost");
const { walkerPost } = require("./walkerPost");
const { userGetbyId } = require("./userGetbyId");
const { getDogs } = require("./getDogs");
const { ownerGetAll } = require("./ownerGetAll");
const { userActivate } = require("./userActivate");
const { userDeActivate } = require("./userDeActivate");
const { walkerActivate } = require("./walkerActivate");
const { walkerDeActivate } = require("./walkerDeActivate");
const { ownerActivate } = require("./ownerActivate");
const { ownerDeActivate } = require("./ownerDeActivate");
const { walkerSetAvailable } = require("./walkerSetAvailable");
const { walkerGetAll } = require("./walkerGetAll");
const { walkPost } = require("./walkPost");
const { walkGetByWalker } = require("./walkGetByWalker");
const { walkGetByOwner } = require("./walkGetByOwner");
const { walkGetAll } = require("./walkGetAll");

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
  dogPost,
  getDogs,
  ownerGetAll,
  walkerSetAvailable,
  walkerGetAll,
  walkPost,
  walkGetAll,
  walkGetByWalker,
  walkGetByOwner
};
