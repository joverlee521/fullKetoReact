// Dependencies
const router = require("express").Router();
const request = require("request");
const appId = process.env.EDAMAM_ID;
const appKey = process.env.EDAMAM_KEY;
const headerId = process.env.NUTRI_ID;
const headerKey = process.env.NUTRI_KEY;

// GET 27 random recipes from EDAMAM API
router.get("/edamam/random", function(req, res){
    const randomNumber = Math.floor(Math.random()*50);
    const queryURL = "https://api.edamam.com/search?app_id=" + appId + "&app_key=" + appKey + "&diet=low-carb&q=keto&from=" + randomNumber + "&to=" + (randomNumber + 36);
    request(queryURL, function(error, response, body){
        if(error){
            throw error;
        }else if(!error && response.statusCode === 200){
            res.json(JSON.parse(body));
        }
    });
});

// GET recipes from EDAMAM API based on search query, limited to 81 recipes
router.get("/edamam/:input", function(req, res){
    const userInput = req.params.input;
    const queryURL = "https://api.edamam.com/search?app_id=" + appId + "&app_key=" + appKey + "&diet=low-carb&health=sugar-conscious&from=0&to=81&q=keto+" + userInput;
    request(queryURL, function(error, response, body){
        if(error){
            throw error;
        }else if(!error && response.statusCode === 200){
            body = JSON.parse(body);
            if(body.hits.length === 0){
                return res.status(404).send("No recipes found!");
            }
            res.json(body);
        }
    });
});

// GET nutrition info from Nutritionix API based on query
router.get("/nutritionix/:food", function(req, res){
    const foodInput = req.params.food;
    const queryURL = "https://trackapi.nutritionix.com/v2/search/instant?detailed=true&branded=false&query=" + foodInput;
    const options = {
        url: queryURL,
        headers: {
            "x-app-id": headerId,
            "x-app-key": headerKey
        }
    };
    request(options, function(error, response, body){
        if(error){
            throw error;
        }else if(!error && response.statusCode === 200){
            body = JSON.parse(body);
            if(body.common.length === 0){
                return res.status(404).send("No food item found!");
            }
            res.json(body.common[0]);
        }
    });
});

module.exports = router;
