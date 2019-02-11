const router = require("express").Router();
const request = require("request");
const appId = process.env.EDAMAM_ID;
const appKey = process.env.EDAMAM_KEY;
const headerId = process.env.NUTRI_ID;
const headerKey = process.env.NUTRI_KEY;

router.get("/edamam/random", function(req, res){
    var randomNumber = Math.floor(Math.random()*50);
    var queryURL = "https://api.edamam.com/search?app_id=" + appId + "&app_key=" + appKey + "&diet=low-carb&q=keto&from=" + randomNumber + "&to=" + (randomNumber + 27);
    request(queryURL, function(error, response, body){
        if(error){
            throw error;
        }else if(!error && response.statusCode === 200){
            res.json(JSON.parse(body));
        }
    });
});

router.get("/edamam/:input", function(req, res){
    var userInput = req.params.input;
    var queryURL = "https://api.edamam.com/search?app_id=" + appId + "&app_key=" + appKey + "&diet=low-carb&health=sugar-conscious&from=0&to=81&q=keto+" + userInput;
    request(queryURL, function(error, response, body){
        if(error){
            throw error;
        }else if(!error && response.statusCode === 200){
            res.json(JSON.parse(body));
        }
    });
});

router.get("/nutritionix/:food", function(req, res){
    var foodInput = req.params.food;
    var queryURL = "https://trackapi.nutritionix.com/v2/search/instant?detailed=true&query=" + foodInput;
    var options = {
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
            res.json(JSON.parse(body));
        }
    });
});

module.exports = router;
