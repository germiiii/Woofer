const { userLogin } = require("./userLogin");
const { userRegister } = require("./userRegister");
const { ownerPost } = require("./ownerPost");
const { dogPost } = require("./dogPost");
const { walkerPost } = require("./walkerPost");
const { userGetbyId } = require("./userGetbyId");
const { getDogs } = require("./getDogs");

module.exports = {
  userLogin,
  userRegister,
  ownerPost,
  walkerPost,
  userGetbyId,
  dogPost,
  getDogs,
};
