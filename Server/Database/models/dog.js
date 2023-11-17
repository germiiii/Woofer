const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "dog",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      breed: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      size: {
        type: DataTypes.ENUM("small", "medium", "large"),
        allowNull: false,
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
