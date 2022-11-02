const express = require("express");
const userController = require("../controllers/user_controller");
const router = express.Router();
const passport = require("passport");

router.get("/profile/:id", passport.checkAuthenticated, userController.profile);
router.post(
	"/update/:id",
	passport.checkAuthenticated,
	userController.updateProfile
);

router.get("/sign-in", userController.signIn);
router.get("/sign-out", userController.signOut);

// create user route
router.post("/create-user", userController.createUser);
// create session
// use passport as a middleware to auth
router.post(
	"/create-session",
	passport.authenticate("local", {
		failureRedirect: "/users/sign-out",
	}),
	userController.createSession
);

router.get("/logged-out", userController.distroySession);

module.exports = router;
