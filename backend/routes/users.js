const express = require("express");
const router = express.Router();
const authJWT = require("../config/passport").authJwt;

// Controllers
const user_controller = require("../controllers/usersController");

// To Do
// Create isAdmin

// GET all users
router.get("/details", authJWT, isAdmin, user_controller.user_list_get);

// POST user Login.. Issue JWT Token
router.post("/login", user_controller.user_login_post);

// POST create a user
router.post("/create", user_controller.user_create_post);

module.exports = router;
