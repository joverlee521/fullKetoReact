const router = require("express").Router();
const userController = require("../../controllers/usersController");
const recipeController = require("../../controllers/recipeController");

router.route("/:id")
    .delete(userController.checkAuth, recipeController.deleteUserRecipes);

module.exports = router;