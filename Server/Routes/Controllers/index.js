const { userLogin } = require("./userLogin");
// const { userRegister } = require("./userRegister");
const { ownerPost } = require("./ownerPost");
const { dogPost } = require("./dogPost");
const { walkerPost } = require("./walkerPost");
const { userGetbyId } = require("./userGetbyId");
const { getDogs } = require("./getDogs");
const { ownerGetAll } = require("./ownerGetAll");
const { walkPost } = require("./walkPost");
const { userActivate } = require("./userActivate");
const { userDeActivate } = require("./userDeActivate");
const { walkerActivate } = require("./walkerActivate");
const { walkerDeActivate } = require("./walkerDeActivate");
const { ownerActivate } = require("./ownerActivate");
const { ownerDeActivate } = require("./ownerDeActivate");


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
  walkPost,
};
