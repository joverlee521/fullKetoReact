"use strict";

module.exports = function(sequelize, DataTypes){

    const ExternalRecipe = sequelize.define("ExternalRecipe", {
        label: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        yield: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        calories: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        totalNutrients: {
            type: DataTypes.JSON,
            allowNull: false
        },
        source: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        uri: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    ExternalRecipe.associate = (models) => {
        ExternalRecipe.belongsTo(models.User, { as: "User" });
    }

    return ExternalRecipe;
}