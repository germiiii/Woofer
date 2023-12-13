const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Notification = sequelize.define(
    "notification",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      type: {
        type: DataTypes.ENUM("payment", "walk", "review", "newUser"),
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: false }
  );

  return Notification;
};
