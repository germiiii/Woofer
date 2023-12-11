const { Router } = require("express");
const { Notification } = require("../Database/db");

const notificationRouter = Router();

// GET /notifications/:userId
notificationRouter.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await Notification.findAll({
      where: { userId },
    });
    return res.json(notifications);
  } catch (error) {
    console.error('Error retrieving notifications:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT /notifications/:id/read
notificationRouter.put('/:id/read', async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await Notification.findByPk(id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    // Update the 'isRead' attribute to true
    notification.isRead = true;
    await notification.save();

    return res.json(notification);
  } catch (error) {
    console.error('Error updating notification:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


// POST /notifications
notificationRouter.post('/', async (req, res) => {
  const { message, type } = req.body;
  try {
    const notification = await Notification.create({ message, type });
    return res.status(201).json(notification);
  } catch (error) {
    console.error('Error creating notification:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = notificationRouter;
