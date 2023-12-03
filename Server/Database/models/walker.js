const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "walker",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      dog_capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      walk_duration: {
        type: DataTypes.ARRAY(DataTypes.ENUM("15", "30", "60", "90")),
        allowNull: true,
      },
      dog_size: {
        type: DataTypes.ARRAY(DataTypes.ENUM("small", "medium", "large")),
        allowNull: true,
      },
      dog_capacity_actual: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      is_available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      schedule_availability: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
