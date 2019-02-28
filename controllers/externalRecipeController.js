const db = require("../models");

module.exports = {
    getSavedRecipes: function(req, res){
        const id = parseInt(req.params.id);
        db.ExternalRecipe.findAll({
            where: {
                UserId: id
            }
        }).then(recipes => {
            console.log(recipes);
            res.send(recipes);
        }).catch(error => res.status(500).json(error));
    },
    saveRecipe: function(req, res){
        db.ExternalRecipe.create(req.body)
        .then(() => res.sendStatus(200))
        .catch(error => res.status(500).json(error));
    },
    deleteRecipe: function(req, res){
        const id = parseInt(req.params.id);
        const uri = "http://www.edamam.com/ontologies/edamam.owl#recipe_" + req.params.recipeUri;
        db.ExternalRecipe.destroy({
            where: {
                uri: uri,
                UserId: id
            }
        }).then(() => res.sendStatus(200))
        .catch(error => res.status(500).json(error));
    },
    deleteAllUserRecipes: function(req, res){
        const id = parseInt(req.params.id);
        db.ExternalRecipe.destroy({
            where: {
                UserId: id
            }
        }).then(() => res.sendStatus(200))
        .catch(error => res.status(500).json(error));
    }
};