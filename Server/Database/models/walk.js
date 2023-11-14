const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define("walk", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        id_dog: {
            type: DataTypes.UUID,
            allowNull: false,
            FOREGEINKEY: true,
        },
        id_walker: {
            type: DataTypes.UUID,
            allowNull: false,
            FOREGEINKEY: true,
        },
        is_owner: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        duration: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        total_price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        dog_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            minvalue: 1,
        }
    });
}
