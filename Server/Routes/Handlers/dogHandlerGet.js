const { getDogs } = require("../Controllers/getDogs");

const dogHandlerGet = async (req, res) => {
  try {
    const { username } = req.params;
    const dogs = await getDogs(username);
    res.json({ dogs });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  dogHandlerGet,
};
