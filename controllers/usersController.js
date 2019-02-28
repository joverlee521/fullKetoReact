const db = require("../models");

module.exports = {
    checkAuth: function(req, res, next){
        const id = parseInt(req.params.id);
        if(req.user && req.user.id === id){
            next();
        }
        else if(!req.user){
            res.sendStatus(401);
        }
        else if(req.user.id !== id){
            res.sendStatus(403);
        }
    },
    update: function(req, res){
        const id = parseInt(req.params.id);
        db.User.update( 
            req.body, 
            {   
                where: { id: id }
            }
        ).then((rows) => {
                if(rows > 0){
                    db.User.findOne({
                        where: { id: id },
                        attributes: ["id","username", "favoriteEdamamRecipes"]
                    }).then(user => res.json(user))
                        .catch(error => res.status(500).json(error));
                }
                else{
                    res.status(404).send("No user updated!");
                }
            })
            .catch(error => {
                res.status(500).json(error);
            });
    },
    delete: function(req, res){
        const id = parseInt(req.params.id);
        if(req.user && req.user.id === id){
            db.User.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                req.session.destroy();
                res.clearCookie("connect.sid") // clean up!
                res.sendStatus(200)
            }).catch(error => res.status(500).json(error));
        }
        else if (!req.user){
            res.sendStatus(401);
        }
        else if(req.user.id !== id){
            res.sendStatus(403);
        }
    }
};