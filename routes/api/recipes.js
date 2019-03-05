const router = require("express").Router();
const userController = require("../../controllers/usersController");
const recipeController = require("../../controllers/recipeController");

// Public route to find one specific recipe
router.route("/find/:recipeId")
    .get(recipeController.getRecipe);

// Protected Routes that require user to be signed in
router.route("/:id")
    .get(userController.checkAuth, recipeController.getUserRecipes)
    .post(userController.checkAuth, recipeController.postRecipe)
    .delete(userController.checkAuth, recipeController.deleteUserRecipes);

module.exports = router;