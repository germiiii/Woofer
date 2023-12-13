// notificationController.js
const { sendEmailNotification } = require("../utils/sendEmailNotification");
const { User, Notification } = require("../../Database/db");
require 
const sendNotification = async (user, type, subject, message, sendEmail) => {
  try {
    const notification = await Notification.create({
      message: subject,
      type,
      email: user.email,
    });
    user.addNotification(notification);
    user.hasNotifications = true;
    await user.save();
    //enviar Mail
    if (sendEmail) {
        sendEmailNotification(user.email, subject, message);
    //   console.log(user.email, subject, message);
    }
  } catch (error) {
    console.error("Error creating notification:", error.message);
  }
};

module.exports = {
  sendNotification,
};
