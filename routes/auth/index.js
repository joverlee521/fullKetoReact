// Dependencies
const router = require("express").Router();
const passport = require("../../config/passport");
const User = require("../../models/user");

// Redirects user to Google Sign in Page
// Once succesful, redirects to callback URL
router.get("/login", passport.authenticate("google", { scope: ["profile"]}));

// Callback URL after Google Sign in 
router.get("/google/callback", 
    // Uses to the googleStrategy to find or create user in database
    passport.authenticate("google", {
    // TODO: added in redirect routes!
    successRedirect: "/",
    failureRedirect: "/"
    })
);

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
router.post("/logout", (req, res) => {
    if(req.user){
        req.session.destroy();
        res.clearCookie("connect.sid") // clean up!
		return res.json({ msg: "logging you out" });
    }
    else{
        return res.json({ msg: "no user to logout"});
    }
});

module.exports = router;