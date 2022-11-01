const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.createComment = function (req, res) {
	// console.log(req.body.post, "**");
	Post.findById(req.body.post, (error, post) => {
		// cheking error
		if (error) {
			console.log("error while finding post to create comment");
			return;
		}
		// console.log(post, error);

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
					post.comments.push(comment._id);
					console.log(post.comments, "************");
					post.save();
					// redirect to the home page
					res.redirect("/");
				}
			);
		}
	});
};

// deleting comments
module.exports.destroy = function (req, res) {
	Comment.findById(req.params.id, (error, comment) => {
		if (error) {
			console.log("error while deleting comment");
			return;
		}

		// when we got the comment
		console.log(comment.user, req.user.id, "*****");
		if (comment.user == req.user.id) {
			console.log("workinf fien ******");
			let postId = comment.post;
			comment.remove();
			Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

			return res.redirect("back");
		} else {
			return res.redirect("back");
		}
	});
};
