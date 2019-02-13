const db = require("../models");

module.exports = {
    update: function(req, res){
        db.User.update( 
            req.body, 
            {   
                returning: true,
                where: { id: req.params.id }
            }
        )
        .then(([rows, user]) => {
            res.json(user);
        })
    }
};