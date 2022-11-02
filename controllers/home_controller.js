const Posts = require("../models/post");
const User = require("../models/user");

module.exports.home = function (req, res) {
	Posts.find({})
		.populate("user")
		// populating user
		.populate({
			path: "comments",
			populate: {
				path: "user",
			},
		})
		.exec((error, posts) => {
			if (error) {
				console.log("error while feching posts");
				return;
			}

			User.find({}, (err, users) => {
				if (err) {
					console.log("err while finding all users");
					return;
				}

				// render home page and sending all user posts
				return res.render("home", {
					title: "Home Page",
					posts,
					all_users: users,
				});
			});
		});
};
