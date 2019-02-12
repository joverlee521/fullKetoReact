"use strict";

module.exports = function(sequelize, DataTypes){
    
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 50]
            }
        },
        googleId: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });

    User.associate = (models) => {
        User.hasMany(models.Recipe, { as: "Recipes", foreignKey: "AuthorId"});
    }

    return User;
}