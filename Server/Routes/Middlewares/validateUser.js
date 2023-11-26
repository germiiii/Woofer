const validateUser = (req, res, next) => {
  // const { eMail, password, fullName } = req.body;

  // if (!fullName) return res.status(400).json({ error: "Missing full name" });
  // if (!eMail) return res.status(400).json({ error: "Missing email" });
  // if (!password) return res.status(400).json({ error: "Missing password" });

  next();
};

module.exports = {
  validateUser,
};
