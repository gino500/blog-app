const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");

// Models
const Blog = require("../models/blogs");

// GET all blogs
exports.blog_list_get = asyncHandler(async (req, res, next) => {
  const allBlogs = await Blog.find({}).sort({ user: 1 });
  res.status(200).json({
    success: true,
    message: "Retrieved all blogs",
    blogs: allBlogs,
  });
});

// POST create a blog
exports.blog_create_post = asyncHandler(async (req, res, next) => {
  try {
    const blog = new Blog({
      user: req.user.id,
      title: req.body.title,
      text: req.body.text,
    });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    if (await blog.save()) {
      res.status(200).json({
        success: true,
        message: "Blog Submitted",
        blog: blog,
      });
    }
  } catch (err) {
    return next(err);
  }
});

// GET single blog
exports.blog_detail_get = asyncHandler(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  res.json({
    success: true,
    message: "Retrieved Blog by ID",
    blog: blog,
  });
});

// PUT update a blog
exports.blog_update_patch = asyncHandler(async (req, res, next) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json({
    success: true,
    message: "Blog Updated",
    blog: updatedBlog,
  });
});

// DELETE a blog
exports.blog_delete_post = asyncHandler(async (req, res, next) => {
  const deleteBlog = await Blog.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: "Blog deleted",
    blog: deleteBlog,
  });
});
