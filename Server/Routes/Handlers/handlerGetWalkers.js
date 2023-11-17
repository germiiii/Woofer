const getWalkers = require('../Controllers/getWalkers');

const successHandler = (res, walkers) => {
  res.status(200).json({ walkers });
};

const failureHandler = (res, error) => {
  console.error('Error al obtener walkers:', error);
  res.status(500).json({ error: 'Error al obtener walkers' });
};

const walkersHandlerGetAll = async (req, res) => {
  try {
    const walkers = await getWalkers.getWalkers();
    successHandler(res, walkers);
  } catch (error) {
    failureHandler(res, error);
  }
};

module.exports = {
  walkersHandlerGetAll,
};