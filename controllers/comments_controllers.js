const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.createComment = function (req, res) {
	Post.findById(req.body.post, (error, post) => {
		// cheking error
		if (error) {
			console.log("error while finding post to create comment");
			return;
		}

		// when we got post
		if (post) {
			// creating comment
			Comment.create(
				{
					content: req.body.content,
					user: req.user._id,
					post: req.body.post,
				},
				(error, comment) => {
					if (error) {
						console.log("error while creating comment");
						return;
					}

					// pushing comment in post comments
					post.comments.push(comment);
					post.save();

					// redirect to the home page
					res.redirect("/");
				}
			);
		}
	});
};
