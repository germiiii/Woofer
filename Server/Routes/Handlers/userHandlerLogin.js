const { userLogin } = require("../controllers");

const userHandlerLogin = async (req, res) => {
  try {
    const { eMail, password } = req.body;
    const token = await userLogin(eMail, password);
    // Return the token as the response
    res.json({ token });
  } catch (error) {
    //{ message: 'An error occurred while registering the user' }
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  userHandlerLogin,
};
