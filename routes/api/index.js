const router = require("express").Router();
const externalAPIs = require("./externalAPIs");

// Book routes
router.use("/external", externalAPIs);

module.exports = router;