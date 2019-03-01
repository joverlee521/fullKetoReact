const db = require("../models");

module.exports = {
    getUserRecipes: function(req, res){
        const id = parseInt(req.params.id);
        db.Recipe.findAll({
            where: {
                AuthorId: id
            }
        }).then(results => res.send(results))
        .catch(error => res.status(500).json(error));
    },
    deleteUserRecipes: function(req, res){
        const id = parseInt(req.params.id);
        db.Recipe.destroy({
            where: {
                AuthorId: id
            }
        }).then(() => res.sendStatus(200))
        .catch(error => res.status(500).json(error));
    }
};