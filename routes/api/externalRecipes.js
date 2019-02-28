const router = require("express").Router();
const userController = require("../../controllers/usersController");
const externalRecipeController = require("../../controllers/externalRecipeController");

router.route("/")
    .post(externalRecipeController.saveRecipe);

router.route("/:id")
    .get(userController.checkAuth, externalRecipeController.getSavedRecipes)
    .delete(userController.checkAuth, externalRecipeController.deleteAllUserRecipes);

router.route("/:id/:recipeUri")
    .delete(userController.checkAuth, externalRecipeController.deleteRecipe);
    
module.exports = router;