// Dependencies
const router = require("express").Router();
const passport = require("../../config/passport");
const User = require("../../models/user");

// Redirects user to Google Sign in Page
// Once succesful, redirects to callback URL
router.get("/login", (req, res, next) => {
    req.session.previous_url = req.headers.referer;
    passport.authenticate("google", { scope: ["profile"]})(req, res, next);
});

// Callback URL after Google Sign in 
router.get("/google/callback", (req, res, next) => {
    // Uses to the googleStrategy to find or create user in database
    passport.authenticate("google", {
    successRedirect: req.session.previous_url,
    failureRedirect: "/"
    })(req, res, next);
});

// GET user object from session if signed in, else returns null
router.get("/user", (req, res) => {
    if(req.user){
        return res.json({user: req.user});
    }
    else{
        return res.json({ user: null });
    }
})

// Logout route that destroys sesssion and clears cookie
router.get("/logout", (req, res) => {
    if(req.user){
        req.session.destroy();
        res.clearCookie("connect.sid") // clean up!
    }
    res.redirect("/");
});

module.exports = router;