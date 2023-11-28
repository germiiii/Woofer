const { userLogin } = require("../Controllers/userLogin");

const userHandlerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userLoginData = await userLogin(email, password);
    // Return the token as the response
    res.json(userLoginData);
  } catch (error) {
    //{ message: 'An error occurred while registering the user' }
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  userHandlerLogin,
};
