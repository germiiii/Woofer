const {
  User,
  Walker,
  Owner,
  Dog,
  Walk,
  WalkType,
  Notification,
} = require("../../Database/db");
const validateWalkData = (req, res, next) => {
  const {
    ownerId,
    walkerId,
    walkTypes,
    dogs,
    duration,
    totalPrice,
    paymentMethod,
  } = req.body;


  // const userOwner = await User.findByPk(ownerId);
  // if (!userOwner) {
  //   throw new Error(`Owner${ownerId} not found`);
  // }
  // const userWalker = await User.findByPk(walkerId);
  // if (!userWalker) {
  //   throw new Error(`Walker ${walkerId} not found`);
  // }
  
  // const owner = await userOwner?.getOwner();
  // const walker = await userWalker?.getWalker();

  // if (!owner?.is_active || !walker?.is_active) {
  //   throw new Error("Walker or Owner not active");
  // }

  // if (!email) return res.status(400).json({ error: "Missing email" });
  // if (!password) return res.status(400).json({ error: "Missing password" });

  next();
};

module.exports = {
  validateWalkData,
};
