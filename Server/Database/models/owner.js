const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define("owner", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        isWalker: {
            FOREGEINKEY: true
        },
        username: {
            type: DataTypes.STRING
        },
    });
}
