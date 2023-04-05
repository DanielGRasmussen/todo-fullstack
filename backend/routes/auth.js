const express = require("express");
const router = express.Router();
const passport = require("passport");
const { logout, callback } = require("../controllers/authController");
const { isNotAuthenticated, isAuthenticated } = require("../utils");

// Login with Google OAuth
router.get(
	"/",
	isNotAuthenticated,
	passport.authenticate("google", { scope: ["profile", "email"] })
);

// Logout and go back to homepage
router.get("/logout", isAuthenticated, logout);

// Google OAuth callback
router.get("/callback", passport.authenticate("google", { failureRedirect: "/login" }), callback);

module.exports = router;
