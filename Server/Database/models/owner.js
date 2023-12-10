const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "owner",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      dog_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      reviews_count: { //counter for the actual number of reviews
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      score: {//sum of all reviews
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    { timestamps: false }
  );
};
