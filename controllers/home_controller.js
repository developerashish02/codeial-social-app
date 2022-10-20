module.exports.home = function (req, res) {
	// return res.redire();

	console.log(req.cookies);
	return res.render("home", {
		title: "Home Page",
	});
};
