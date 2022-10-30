const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comments_controllers");

router.post("/create", commentController.createComment);

module.exports = router;
