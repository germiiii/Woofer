const { userLogin } = require("./userLogin");
const { userRegister } = require("./userRegister");
const { ownerPost } = require("./ownerPost");
const { walkerPost } = require("./walkerPost");
const { userGetbyId } = require("./userGetbyId");

module.exports = {
  userLogin,
  userRegister,
  ownerPost,
  walkerPost,
  userGetbyId,  
};
