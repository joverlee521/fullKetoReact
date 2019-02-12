// Dependencies
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../../models").User;

const strategy = new GoogleStrategy(
	{
		clientID: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
	},
	function(token, tokenSecret, profile, done) {
		const { id, name } = profile;
		User.findOrCreate({
			where: {
				googleId: id
			},
			defaults: {
				username: name.givenName
			}
		}).spread(function(user, created){
			return done(null, user);
		});
	}
);

module.exports = strategy;