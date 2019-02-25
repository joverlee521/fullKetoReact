const db = require("../models");

module.exports = {
    update: function(req, res){
        const id = parseInt(req.params.id);
        // Checking that the user is signed in
        // Make sure the user is only updating their own account
        if(req.user && req.user.id === id){
            db.User.update( 
                req.body, 
                {   
                    where: { id: id }
                }
            ).then((rows) => {
                    if(rows > 0){
                        db.User.findOne({
                            where: { id: id },
                            attributes: ["username", "favoriteEdamamRecipes"]
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
        }
        else if(!req.user){
            res.sendStatus(401);
        }
        else if(req.user.id !== id){
            res.sendStatus(403);
        }
    }
};