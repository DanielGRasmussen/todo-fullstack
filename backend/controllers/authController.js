const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const User = require("../models/user");
const { encrypt } = require("../encryption");
require("dotenv").config();

// Configure Google OAuth 2.0 strategy
passport.use(
	"google",
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "/auth/callback"
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				let user = await User.findOne({ googleId: profile.id });
				if (user) {
					// if user already exists, return it
					return done(null, user);
				} else {
					// if user does not exist, create a new user
					// encrypt info
					let email = profile.emails[0].value;
					let name = profile.displayName;

					name = encrypt(name);
					email = encrypt(email);

					const newUser = new User({
						googleId: profile.id,
						email: email,
						name: name,
						picture: profile.photos[0].value
					});
					await newUser.save();
					return done(null, newUser);
				}
			} catch (err) {
				return done(err);
			}
		}
	)
);

// serialize user into session
passport.serializeUser((user, done) => {
	done(null, user.id);
});

// deserialize user from session
passport.deserializeUser(async (id, done) => {
	const user = await User.findById(id);
	done(null, user);
});

exports.logout = function (req, res) {
	req.logout(() => {
		res.redirect("/");
	});
};

exports.callback = function (req, res) {
	// redirect user to homepage
	res.redirect("/");
};
