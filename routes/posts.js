const express = require("express");
const passport = require("passport");
const postsController = require("../controllers/posts_controllers");
const router = express.Router();

router.post("/create-post", postsController.createPost);
router.get(
	"/destroy/:id",
	passport.checkAuthenticated,
	postsController.destroy
);

module.exports = router;
