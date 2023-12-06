const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "walk",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      duration: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      dogNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        minvalue: 1,
      },
      totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      paymentMethod: {
        type: DataTypes.ENUM("paypal", "mercadopago"),
        allowNull: false,
      },
      state: {
        type: DataTypes.ENUM("toDo", "inProgress", "done"),
        defaultValue: "toDo",
        allowNull: false,
      },
      hasOwnerReview: {
        type: DataTypes.BOOLEAN ,
        defaultValue: false,
        allowNull: false,
      },
      hasWalkerReview: {
        type: DataTypes.BOOLEAN ,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
