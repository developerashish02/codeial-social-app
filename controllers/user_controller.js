module.exports.profile = function (req, res) {
	return res.render("user_profile");
};

// sign in user
module.exports.signIn = function (req, res) {
	return res.render("user_sign_in");
};

//  todo sign up user

module.exports.signOut = function (req, res) {
	return res.render("user_sign_out");
};

// create user
module.exports.createUser = function (req, res) {
	console.log(req.body);
	return res.redirect("back");
};

// sign in and   create a session

module.exports.createSession = function (req, res) {
	// todo
};
