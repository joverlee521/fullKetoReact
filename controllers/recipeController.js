const db = require("../models");

module.exports = {
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