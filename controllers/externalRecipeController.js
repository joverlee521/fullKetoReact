const db = require("../models");

module.exports = {
    getSavedRecipes: function(req, res){
        const id = parseInt(req.params.userId);
        if(req.user && req.user.id === id){
            db.ExternalRecipe.findAll({
                where: {
                    UserId: id
                }
            }).then(recipes => {
                console.log(recipes);
                res.send(recipes);
            }).catch(error => res.statsu(500).json(error));
        }
        else if(!req.user){
            res.status(401);
        }
        else if(req.user.id !== id){
            res.status(403);
        }
    },
    saveRecipe: function(req, res){
        const id = req.body.UserId;
        if(req.user && req.user.id === id){
            db.ExternalRecipe.create(req.body)
            .then(() => res.sendStatus(200))
            .catch(error => res.status(500).json(error));
        }
        else if(!req.user){
            res.status(401)
        }
        else if(req.user.id !== id){
            res.status(403);
        }
    },
    deleteRecipe: function(req, res){
        const id = parseInt(req.params.userId);
        const uri = "http://www.edamam.com/ontologies/edamam.owl#recipe_" + req.params.recipeUri;
        if(req.user && req.user.id === id){
            db.ExternalRecipe.destroy({
                where: {
                    uri: uri,
                    UserId: id
                }
            }).then(() => res.sendStatus(200))
                .catch(error => res.status(500).json(error));
        }
        else if(!req.user){
            res.status(401);
        }
        else if(req.user.id !== id){
            res.status(403);
        }
    }
};