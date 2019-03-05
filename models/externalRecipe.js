"use strict";

module.exports = function(sequelize, DataTypes){

    const ExternalRecipe = sequelize.define("ExternalRecipe", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        servings: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        calories: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fat: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        protein: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        carbs: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fiber: {
            type: DataTypes.INTEGER,
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