const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "walkType",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      walk_type: {
        type: DataTypes.ENUM("premium", "standart", "express"),
        allowNull: true
      },
      dog_capacity: {
        type: DataTypes.ENUM("low", "medium", "high"),
        allowNull: true,
      },
      walk_duration: {
        type: DataTypes.ENUM("15", "30", "60", "90"),
        allowNull: true,
      },
      dog_size: {
        type: DataTypes.ENUM("small", "medium", "large"),
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
