const request = require("request");
const db = require("../models");
const headerId = process.env.NUTRI_ID;
const headerKey = process.env.NUTRI_KEY;

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
    },
    postRecipe: function(req, res){
        const ingredients = req.body.ingredients;
        let query = "";
        // Make query based on ingredients list
        ingredients.forEach(ingredient => {
            const term = `${ingredient.amount} ${ingredient.unit} ${ingredient.name} `;
            query += term;
        });
        const options = {
            url: "https://trackapi.nutritionix.com/v2/natural/nutrients",
            headers: {
                "x-app-id": headerId,
                "x-app-key": headerKey,
                "x-remote-user-id": 0,
            },
            method: "POST",
            body: {
                "query": query
            },
            json: true
        };
        // Use Nutritionix API to calculate nutrition info for recipe
        request(options, function(error, response, body){
            if(error){
                throw error;
            }else if(!error && response.statusCode === 200){
                let calories = 0;
                let fat = 0;
                let protein = 0;
                let carbs = 0;
                let fiber = 0;
                // Calculate the total nutrition info
                body.foods.forEach(food => {
                    calories += food.nf_calories;
                    fat += food.nf_total_fat;
                    protein += food.nf_protein;
                    carbs += food.nf_total_carbohydrate;
                    fiber += food.nf_dietary_fiber;
                });
                req.body.calories = Math.round(calories / req.body.servings);
                req.body.fat = Math.round(fat / req.body.servings);
                req.body.protein = Math.round(protein / req.body.servings);
                req.body.carbs = Math.round(carbs / req.body.servings);
                req.body.fiber = Math.round(fiber / req.body.servings);
                // Create recipe in database
                db.Recipe.create(req.body)
                .then(() => res.sendStatus(200))
                .catch(error => {
                    console.log(error)
                    res.status(500).json(error)
                });
            }
        });
    }
};