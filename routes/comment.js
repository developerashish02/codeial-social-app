const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comments_controllers");
const passport = require("passport");

router.post(
	"/create",
	passport.checkAuthenticated,
	commentController.createComment
);
router.get(
	"/destroy/:id",
	passport.checkAuthenticated,
	commentController.destroy
);
module.exports = router;
