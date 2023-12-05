const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Review = sequelize.define("review", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ARRAY(DataTypes.ENUM("owner", "walker")),
      allowNull: true,
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return Review;
};