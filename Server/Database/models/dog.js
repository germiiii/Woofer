const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define("dog", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        id_owner: {
            type: DataTypes.UUID,
            allowNull: false,
            FOREGEINKEY: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        breed: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        size: {
            type: DataTypes.ENUM("small", "medium", "large"),
            allowNull: false,
        }
    });
}
