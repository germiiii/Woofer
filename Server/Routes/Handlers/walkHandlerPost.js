const { walkPost } = require("../Controllers/");

const walkHandlerPost = async (req, res) => {
  try {
    const {
      ownerId,
      walkerId,
      walkTypes,
      dogs,
      duration,
      totalPrice,
      paymentMethod,
    } = req.body;
   
    console.log( ownerId,
      walkerId,
      walkTypes,
      dogs,
      duration,
      totalPrice,
      paymentMethod)
    
    const newWalk = await walkPost(
      ownerId,
      walkerId,
      walkTypes,
      dogs,
      duration,
      totalPrice,
      paymentMethod
    );
  
    res.json({ newWalk });
   
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  walkHandlerPost,
};
