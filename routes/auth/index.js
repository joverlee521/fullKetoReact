// Dependencies
const router = require("express").Router();
const passport = require("../../config/passport");
const User = require("../../models/user");

router.get("/login", passport.authenticate("google", { scope: ["profile"]}));

router.get("/google/callback", passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/"
}));

module.exports = router;