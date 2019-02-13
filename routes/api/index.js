// Dependencies
const router = require("express").Router();
const externalAPIs = require("./externalAPIs");
const userRoutes = require("./users");

// External API routes
router.use("/external", externalAPIs);

// User routes
router.use("/user", userRoutes);

module.exports = router;