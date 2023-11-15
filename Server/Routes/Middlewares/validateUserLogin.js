const validateUserLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ error: "Missing email" });
  if (!password) return res.status(400).json({ error: "Missing password" });

  next();
};

module.exports = {
  validateUserLogin,
};
