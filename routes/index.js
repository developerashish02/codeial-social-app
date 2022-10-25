const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");
const passport = require("passport");

router.get("/", passport.checkAuthenticated, homeController.home);
router.use("/users", require("./user"));
router.use("/posts", require("./posts"));

module.exports = router;
