const router = require("express").Router();
const externalRecipeController = require("../../controllers/externalRecipeController");

router.route("/")
    .post(externalRecipeController.saveRecipe);

router.route("/:userId/:recipeUri")
    .delete(externalRecipeController.deleteRecipe);
    
module.exports = router;