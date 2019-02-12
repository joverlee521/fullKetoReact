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
            allowNull: true
        },
        ingredients: {
            type: DataTypes.TEXT,
            allowNull: false,
            get(){
                return this.getDataValue("ingredients").split(";");
            },
            set(val){
                return this.setDataValue("ingredients", val.join(";"));
            }
        },
        instructions: {
            type: DataTypes.TEXT,
            allowNull: false,
            get(){
                return this.getDataValue("instructions").split(";");
            },
            set(val){
                return this.setDataValue("instructions", val.join(";"));
            }
        },
        totalCarb: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    });

    Recipe.associate = (models) => {
        Recipe.belongsTo(models.User, { as: "Author" });
    }

    return Recipe;
}