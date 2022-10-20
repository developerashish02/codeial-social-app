const express = require("express");
const userController = require("../controllers/user_controller");
const router = express.Router();

router.get("/profile", userController.profile);

router.get("/sign-in", userController.signIn);
router.get("/sign-out", userController.signOut);

// create user route
router.post("/create-user", userController.createUser);

module.exports = router;
