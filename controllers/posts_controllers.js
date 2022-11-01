const Post = require("../models/post");
const Comment = require("../models/comment");

// create post
module.exports.createPost = function (req, res) {
	Post.create(
		{
			content: req.body.content,
			user: req.user._id,
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

// delete post using authenticated
module.exports.destroy = function (req, res) {
	Post.findById(req.params.id, (error, post) => {
		// catching error
		if (error) {
			console.log("error while finding post when we distroy post");
			return;
		}

		// authenticate user to  delete the post
		//  .id means to converting object id into string
		if (post.user == req.user.id) {
			// console.log("condition ok");
			post.remove();

			// delete all comments on post
			Comment.deleteMany({ post: req.params.id }, (err) => {
				if (err) {
					console.log("error while deleting comments");
					return;
				}
				return res.redirect("back");
			});
		}
		// post not match
		else {
			res.redirect("back");
		}
	});
};
