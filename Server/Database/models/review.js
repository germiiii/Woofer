const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("calification", {
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
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};
