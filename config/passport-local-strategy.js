const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

// authentication using passport
passport.use(
	new LocalStrategy(
		{
			usernameField: "email",
		},

		function (email, password, done) {
			// find a user istablish identuty
			console.log("come in passport");
			User.findOne({ email: email }, function (error, user) {
				if (error) {
					console.log("error while finding user --> passport ", error);
					return done(error);
				}

				if (!user || user.password !== password) {
					console.log("Invalid user name/password");
					return done(null, false);
				}
				return done(null, user);
			});
		}
	)
);

// serializing user to deside which key is kept in cookeie
passport.serializeUser((user, done) => {
	done(null, user.id);
});

// deserializing the user
passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		if (err) {
			console.log("err while deserializing user");
			return done(err);
		}

		return done(null, user);
	});
});

// check if the user is authenticated

passport.checkAuthenticated = function (req, res, next) {
	// if the user is signed in pass in the requrest to the next function is controller action
	if (req.isAuthenticated()) {
		return next();
	}

	// if the user is not signd in
	return res.redirect("/users/sign-out");
};

passport.setAuthenticated = function (req, res, next) {
	if (req.isAuthenticated()) {
		// req user contain current signed in user from the session cookie we are just sending this to the locals for the view
		console.log(req.user);
		res.locals.user = req.user;
	}
	next();
};

module.exports = passport;
