const Post = require("../models/post");

// create post
module.exports.createPost = function (req, res) {
	Post.create(
		{
			content: req.body.content,
		},
		(error, post) => {
			if (error) {
				console.log("error while creating post");
				return;
			}
			return res.redirect("back");
		}
	);
};
