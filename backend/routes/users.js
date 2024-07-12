const express = require("express");
const router = express.Router();
const authJWT = require("../config/passport").authJwt;
const validator = require("../config/validator");

// Controllers
const user_controller = require("../controllers/usersController");

// To Do
// Create isAdmin

// GET all users
router.get("/details", user_controller.user_list_get);

// POST user Login.. Issue JWT Token
router.post(
  "/login",
  validator.userLoginValidator,
  user_controller.user_login_post
);

router.post("/logout", user_controller.user_logout_post);

// POST create a user
router.post(
  "/create",
  validator.userCreateValidator,
  user_controller.user_create_post
);

router.get("/:id", user_controller.user_detail_get);

module.exports = router;
