"use strict";

module.exports = function(sequelize, DataTypes){

    const Recipe = sequelize.define("Recipe", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 50]
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: [2, 150]
            }
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "https://user-images.githubusercontent.com/40774762/53704189-45cb8080-3dcf-11e9-85d7-74392894a053.jpeg"
        },
        servings: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                min: 1
            }
        },
        servingSize: {
            type: DataTypes.STRING,
            allowNull: false
        },
        prepTime: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cookTime: {
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
        ingredients: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        instructions: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        source: {
            type: DataTypes.STRING,
            defaultValue: "FullKeto"
        }
    });

    Recipe.associate = (models) => {
        Recipe.belongsTo(models.User, { as: "Author" });
    }

    return Recipe;
}