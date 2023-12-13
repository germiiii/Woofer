const { walkUpdateState } = require("../Controllers");

const walkHandlerPut = async (req, res) => {
  try {
    const { walkId } = req.params;
    const { state } = req.body;

    const updatedWalk = await walkUpdateState(id= walkId, state);

    res.json({ updatedWalk });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  walkHandlerPut,
};
