const express = require("express");
const router = express.Router();
const authJWT = require("../config/passport").authJwt;
const validator = require("../config/validator");

// Controllers
const blog_controller = require("../controllers/blogsController");
const comment_controller = require("../controllers/commentController");

// URI Blog Only

// Create middleware to prevent user from accessing other user blogs

// GET all blogs
router.get("/", authJWT, blog_controller.blog_list_get);

// POST create a blog
router.post("/create", authJWT, validator.blogCreateValidator, blog_controller.blog_create_post);

// GET single blog
router.get("/:id", authJWT, blog_controller.blog_detail_get);

// PUT update a blog
router.patch("/update/:id", authJWT, blog_controller.blog_update_patch);

// DELETE a blog
router.delete("/delete/:id", authJWT, blog_controller.blog_delete_post);

// URI Blogs & Comments

// GET all comments for specific blog
router.get("/:blogid/comments", authJWT, comment_controller.comment_list_get);

// POST create single comment for specific blog
router.post("/:blogid/comments/create", authJWT, validator.commentCreateValidator, comment_controller.comment_create_post);

// GET single comment for specific blog
router.get("/:blogid/comments/:commentid", authJWT, comment_controller.comment_detail_get);

// DELETE specific comment on specific blog
router.delete("/:blogid/comments/delete/:commentid", authJWT, comment_controller.comment_delete_post);

// POST add Like to comment
router.post("/:blogid/comments/like/:commentid", authJWT, comment_controller.comment_like_post);

module.exports = router;
