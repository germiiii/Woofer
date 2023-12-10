const { reviewPost } = require("../Controllers/reviewPost");

const reviewHandlerPost = async (req, res) => {
  try {
    const { idWalk, type, score, description } = req.body;
    const newReview = await reviewPost(idWalk, type, score, description);
    res.json({ newReview });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  reviewHandlerPost,
};
