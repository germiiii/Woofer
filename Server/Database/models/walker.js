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
      dog_capacity_actual: { //counter for the actual number of dogs
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      walk_duration: {
        type: DataTypes.ARRAY(DataTypes.ENUM("15", "30", "60", "90")),
        allowNull: true,
      },
      dog_size: {
        type: DataTypes.ARRAY(DataTypes.ENUM("small", "medium", "high")),
        allowNull: true,
      },
      sale_details: {
        type: DataTypes.TEXT,
        allowNull: true,
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
      reviews_count: { //counter for the actual number of reviews
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      score: { //sum of all reviews
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
