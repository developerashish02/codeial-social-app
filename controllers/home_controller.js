module.exports.home = function (req, res) {
	// return res.redire();
	return res.render("home", {
		title: "Home Page",
	});
};
