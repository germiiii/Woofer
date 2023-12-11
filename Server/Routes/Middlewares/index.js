const { validateUserLogin } = require("./validateUserLogin");
const { validateUser } = require("./validateUser");
const { validateWalkData } = require("./validateWalkData");
const passport = require("./passport");

module.exports = {
  passport,
  validateUser,
  validateUserLogin,
  validateWalkData
};
