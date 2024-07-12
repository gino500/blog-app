const express = require("express");
const router = express.Router();
const validator = require("../config/validator");
const protectJWT = require("../config/authJwtCookie").protect;

// Controllers
const blog_controller = require("../controllers/blogsController");
const comment_controller = require("../controllers/commentController");

// GET all blogs
router.get("/", blog_controller.blog_list_get);

// POST create a blog
router.post(
  "/create",
  protectJWT,
  validator.blogCreateValidator,
  blog_controller.blog_create_post
);

// GET single blog
router.get("/:blogid", blog_controller.blog_detail_get);

// PUT update a blog
router.patch("/update/:blogid", protectJWT, blog_controller.blog_update_patch);

// DELETE a blog
router.delete("/delete/:blogid", protectJWT, blog_controller.blog_delete_post);

// URI Blogs & Comments

// GET all comments for specific blog
router.get("/:blogid/comments", comment_controller.comment_list_get);

// POST create single comment for specific blog
router.post(
  "/:blogid/comments/create",
  protectJWT,
  validator.commentCreateValidator,
  comment_controller.comment_create_post
);

// GET single comment for specific blog
router.get(
  "/:blogid/comments/:commentid",
  comment_controller.comment_detail_get
);

// DELETE specific comment on specific blog
router.delete(
  "/:blogid/comments/delete/:commentid",
  protectJWT,
  comment_controller.comment_delete_post
);

// POST add Like to comment
router.post(
  "/:blogid/comments/like/:commentid",
  protectJWT,
  comment_controller.comment_like_post
);

module.exports = router;
