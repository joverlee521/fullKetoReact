const router = require("express").Router();
const userController = require("../../controllers/usersController");
const recipeController = require("../../controllers/recipeController");

router.route("/:id")
    .get(userController.checkAuth, recipeController.getUserRecipes)
    .delete(userController.checkAuth, recipeController.deleteUserRecipes);

module.exports = router;