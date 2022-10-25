const express = require("express");
const postsController = require("../controllers/posts_controllers");
const router = express.Router();

router.post("/create-post", postsController.createPost);

module.exports = router;
