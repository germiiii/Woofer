const { getAvailableWalkers } = require('../Controllers/walkerGetAvailable');

const successHandler = (res, walkers) => {
  res.status(200).json({ walkers });
};

const failureHandler = (res, error) => {
  console.error('Error al obtener walkers:', error);
  res.status(500).json({ error: 'Error al obtener walkers' });
};

const walkerHandlerGetAvailable = async (req, res) => {
  try {
    const walkers = await getAvailableWalkers();
    successHandler(res, walkers);
  } catch (error) {
    failureHandler(res, error);
  }
};

module.exports = {
  walkerHandlerGetAvailable,
};