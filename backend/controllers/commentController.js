const asyncHandler = require("express-async-handler");
const utils = require("../lib/utils");

// Models
const Blog = require("../models/blogs");
const Comment = require("../models/comments");

// GET all comments for specific blog
exports.comment_list_get = asyncHandler(async (req, res, next) => {
  const blog = await Blog.findById(req.params.blogid);
  const allComments = [];

  if (blog.comment.length) {
    for (let commentId of blog.comment) {
      const comments = await Comment.findById(commentId);
      allComments.push(comments);
    }
  }
  if (allComments.length === blog.comment.length) {
    res.json({
      success: true,
      message: "Retrieved all Comments",
      comment: allComments,
    });
  }
});

// POST create single comment for specific blog
exports.comment_create_post = asyncHandler(async (req, res, next) => {
  try {
    const comment = new Comment({
      user: req.user.id,
      blog: req.params.blogid,
      text: req.body.text,
    });
    await comment.save();
    await Blog.findByIdAndUpdate(
      req.params.blogid,
      {
        $push: { comment: comment },
      },
      { new: true }
    );
  } catch (err) {
    return next(err);
  }

  res.json({
    success: true,
    message: "Comment Created",
  });
});

// GET single comment for specific blog
exports.comment_detail_get = asyncHandler(async (req, res, next) => {
  const blogId = req.params.blogid;
  const commentId = req.params.commentid;

  const blog = await Blog.findById(blogId);
  const comment = await Comment.findById(commentId);

  if (blog.id === comment.blog.toHexString()) {
    res.json({
      success: true,
      message: "Retrieved Comment on Blog",
      comment: comment,
    });
  }
});

// DELETE specific comment on specific blog
exports.comment_delete_post = asyncHandler(async (req, res, next) => {
  const blog = await Blog.findById(req.params.blogid);
  const comment = await Comment.findById(req.params.commentid);

  if (blog.id === comment.blog.toHexString()) {
    await comment.deleteOne();
    await blog.updateOne({ $pull: { comment: comment.id } }, { new: true });
  }
  res.json({
    success: true,
    message: "Deleted Comment",
  });
});

// POST add Like to comment
exports.comment_like_post = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findByIdAndUpdate(
    req.params.commentid,
    {
      $inc: { like_count: +1 },
    },
    { new: true }
  );
  res.json({
    success: true,
    message: "Like Count Increased by 1",
    count: comment.like_count,
  });
});
