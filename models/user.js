module.exports = function(sequelize, DataTypes){
    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 50]
            }
        },
        token: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
    return User;
}