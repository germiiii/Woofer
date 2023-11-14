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
            FOREGEINKEY: true, 
            type: DataTypes.BOOLEAN,
        },
        username: {
            type: DataTypes.STRING
        },
    });
}
