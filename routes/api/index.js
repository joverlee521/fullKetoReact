// Dependencies
const router = require("express").Router();
const externalAPIs = require("./externalAPIs");

// External API routes
router.use("/external", externalAPIs);

module.exports = router;