// Dependencies
const passport = require("passport");
const GoogleStratgey = require("./googleStrategy");
const User = require("../../models/user");

// This method is called on successful login to store user info in the session
passport.serializeUser((user, done) => {
	console.log('=== serialize ... called ===')
	console.log(user) // the whole raw user object!
	console.log('---------')
	done(null, { _id: user._id })
});

// This method is called all subsequent requests to load the user info from session
passport.deserializeUser((id, done) => {
	console.log('Deserialize ... called')
	User.findOne(
		{ _id: id },
		'firstName lastName photos local.username',
		(err, user) => {
			console.log('======= DESERIALIZE USER CALLED ======')
			console.log(user)
			console.log('--------------')
			done(null, user)
		}
	)
});

// ==== Register Strategies ====
passport.use(GoogleStratgey);

module.exports = passport;