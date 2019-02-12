// Dependencies
const passport = require("passport");
const GoogleStratgey = require("./googleStrategy");
const User = require("../../models").User;

// This method is called on successful login to store user info in the session
passport.serializeUser((user, done) => {
	console.log('=== serialize ... called ===');
	done(null, user.id);
});

// This method is called all subsequent requests to load the user info from session
passport.deserializeUser((id, done) => {
	console.log('Deserialize ... called')
	User.findById(id)
		.then(user => {
			console.log('======= DESERIALIZE USER CALLED ======');
			done(null, user);
		})
});

// ==== Register Strategies ====
passport.use(GoogleStratgey);

module.exports = passport;