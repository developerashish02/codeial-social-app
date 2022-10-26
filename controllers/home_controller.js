const Posts = require("../models/post");

module.exports.home = function (req, res) {
	Posts.find({})
		.populate("user")
		.exec((error, posts) => {
			if (error) {
				console.log("error while feching posts");
				return;
			}
			// render home page and sending all user posts
			return res.render("home", {
				title: "Home Page",
				posts,
			});
		});
};
