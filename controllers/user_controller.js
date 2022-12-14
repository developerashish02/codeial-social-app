const User = require("../models/user");

module.exports.profile = function (req, res) {
	User.findById(req.params.id, (err, user) => {
		if (err) {
			console.log("err while finding user profile");
			return;
		}
		return res.render("user_profile", {
			profile_user: user,
		});
	});
};

// sign in user
module.exports.signIn = function (req, res) {
	// when user is alredy sign in
	if (req.isAuthenticated()) {
		return res.redirect("/users/profile");
	}
	return res.render("user_sign_in");
};

//  todo sign up user
module.exports.signOut = function (req, res) {
	// when user is alredy sign up
	if (req.isAuthenticated()) {
		return res.redirect("/users/profile");
	}
	return res.render("user_sign_out");
};

// create user
module.exports.createUser = function (req, res) {
	// checking password and confirm password is same or not
	if (req.body.user_password !== req.body.confirm_password) {
		console.log("password and confirm password not matches");
		return res.redirect("back");
	}

	// checking email duplications
	User.findOne({ email: req.body.user_email }, (error, user) => {
		if (error) {
			console.log("error while finding duplicate email id");
			return;
		}
		// created new user
		if (!user) {
			User.create(
				{
					name: req.body.user_name,
					email: req.body.user_email,
					password: req.body.user_password,
				},
				(error, user) => {
					console.log(user);
					if (error) {
						console.log("error while creating new user");
						return;
					}
					return res.redirect("/users/sign-out");
				}
			);
		}
		// when user email is aredy register
		else {
			console.log("email is alredy register");
			return res.redirect("back");
		}
	});
};

// sign in and   create a session
module.exports.createSession = function (req, res) {
	// todo
	req.flash("success", "Logged in successfully!");
	return res.redirect("/");
};

// destroy session
module.exports.distroySession = function (req, res) {
	// passport doing this
	req.logout((err) => {
		if (err) {
			return next(err);
		}
	});
	req.flash("success", "Logged out successfully!");
	return res.redirect("/");
};

// update user profile
module.exports.updateProfile = function (req, res) {
	if (req.user.id == req.params.id) {
		User.findByIdAndUpdate(req.params.id, req.body, (err, updatedUser) => {
			if (err) {
				console.log("err while updating user");
				return;
			}

			return res.redirect("back");
		});
	} else {
		res.status(401).send("unotherized");
	}
};
