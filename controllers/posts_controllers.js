const Post = require("../models/post");
const Comment = require("../models/comment");

// create post
module.exports.createPost = async function (req, res) {
	try {
		await Post.create({
			content: req.body.content,
			user: req.user._id,
		});

		return res.redirect("back");
	} catch (error) {
		console.log("error while creating post");
		return;
	}
};

// delete post using authenticated
module.exports.destroy = async function (req, res) {
	try {
		let post = await Post.findById(req.params.id);

		// authenticate user to  delete the post
		//  .id means to converting object id into string
		if (post.user == req.user.id) {
			// console.log("condition ok");
			post.remove();

			// delete all comments on post
			await Comment.deleteMany({ post: req.params.id });
			return res.redirect("back");
		}
		// post not match
		else {
			res.redirect("back");
		}
	} catch (error) {
		console.log("error while posts asnys ");
	}
};
