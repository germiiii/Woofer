const { reviewGet } = require("../Controllers");

const reviewHandlerGet = async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await reviewGet(id);
    res.json({ reviews });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  reviewHandlerGet,
};
