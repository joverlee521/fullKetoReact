// Dependencies
const router = require("express").Router();
const externalAPIs = require("./externalAPIs");
const userRoutes = require("./users");
const externalRecipeRoutes = require("./externalRecipes");

// External API routes
router.use("/external", externalAPIs);

// User routes
router.use("/user", userRoutes);

// Externa Recipe routes
router.use("/externalRecipes", externalRecipeRoutes);

module.exports = router;