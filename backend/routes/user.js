const express = require("express");
const router = express.Router();
const { getCurrentUser } = require("../controllers/userController");
const { isAuthenticated } = require("../utils");

router.get("/", isAuthenticated, getCurrentUser);

module.exports = router;
