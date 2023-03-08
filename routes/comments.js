const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utills/catchAsync");
const ExpressError = require("../utills/ExpressError");
const Blog = require("../models/blogpost");
const Comment = require("../models/comments");
const { CommentSchema } = require("../Schemas");
const { isLoggedin } = require("../middleware");

const validateComment = (req, res, next) => {
  const { error } = CommentSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

router.post(
  "/",
  isLoggedin,
  validateComment,
  catchAsync(async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    const comment = new Comment(req.body);
    comment.author = req.user._id;
    blog.comments.push(comment);
    await comment.save();
    await blog.save();
    req.flash("success", "Successfully added comment");
    res.redirect(`/blogs/${blog._id}`);
  })
);

router.delete(
  "/:commentId",
  isLoggedin,
  catchAsync(async (req, res) => {
    const { id, commentId } = req.params;
    const b = await Blog.findByIdAndUpdate(id, {
      $pull: { comments: commentId },
    });
    const a = await Comment.findByIdAndDelete(commentId);
    req.flash("success", "comment deleted successfully");
    res.redirect(`/blogs/${id}`);
  })
);

module.exports = router;
