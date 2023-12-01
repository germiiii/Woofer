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
      duration: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      dogNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        minvalue: 1,
      },
      state: {
        type: DataTypes.ENUM("toDo", "inProgress", "done"),
        defaultValue: "toDo",
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
