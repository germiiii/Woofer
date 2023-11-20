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
      // id_dog: {
      //   type: DataTypes.UUID,
      //   allowNull: false,
      //   FOREGEINKEY: true,
      // },
      // id_walker: {
      //   type: DataTypes.UUID,
      //   allowNull: false,
      //   FOREGEINKEY: true,
      // },
      // is_owner: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      duration: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.INTEGER,
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
    { timestamps: false }
  );
};
