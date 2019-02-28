// Dependencies
const router = require("express").Router();
const externalAPIs = require("./externalAPIs");
const userRoutes = require("./users");
const externalRecipeRoutes = require("./externalRecipes");
const recipeRoutes = require("./recipes");

// External API routes
router.use("/external", externalAPIs);

// User routes
router.use("/user", userRoutes);

// External Recipe routes
router.use("/externalRecipes", externalRecipeRoutes);

//Recipe routes
router.use("/recipes", recipeRoutes);

module.exports = router;