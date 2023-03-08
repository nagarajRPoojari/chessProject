const express = require("express");
const router = express.Router();
const catchAsync = require("../utills/catchAsync");
const ExpressError = require("../utills/ExpressError");
const Blog = require("../models/BlogPost");
const { BlogSchema } = require("../Schemas");
const { isLoggedin, isAuthor } = require("../middleware");

const validateBlog = (req, res, next) => {
  const { error } = BlogSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

router.put(
  "/:id",
  isLoggedin,
  isAuthor,
  catchAsync(async (req, res) => {
    await Blog.findByIdAndUpdate(req.params.id, req.body);
    req.flash("success", "Successfully updated your article");
    res.redirect(`/blogs/${req.params.id}`);
  })
);

router.post(
  "/new",
  isLoggedin,
  validateBlog,
  catchAsync(async (req, res) => {
    req.originalUrl = req.url;
    const post = await new Blog(req.body).save();
    post.author = req.user._id;
    post.date = new Date().toDateString();
    req.flash("success", "Successfully posted an article");
    res.redirect("/blogs");
  })
);

router.get(
  "/",
  catchAsync(async (req, res) => {
    const allPosts = await Blog.find();
    res.render("articles/blogs.ejs", { allPosts });
  })
);
///-------------------------
router.get(
  "/new",
  isLoggedin,
  catchAsync(async (req, res) => {
    req.originalUrl = req.url;
    res.render("articles/new.ejs");
  })
);

router.get(
  "/:id/edit",
  isLoggedin,
  isAuthor,
  catchAsync(async (req, res) => {
    const post = await Blog.findById(req.params.id);
    res.render("articles/edit.ejs", { post });
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const post = await Blog.findById(req.params.id)
      .populate({
        path: "comments",
        populate: {
          path: "author",
        },
      })
      .populate("author");
    if (!post) {
      req.flash("error", "Article not found");
      res.redirect("/blogs");
    }
    res.render("articles/show.ejs", { post });
  })
);

router.delete(
  "/:id",
  isLoggedin,
  isAuthor,
  catchAsync(async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id);
    req.flash("success", "Post deleted successfully");
    res.redirect("/blogs");
  })
);

router.get(
  "/:id/complement?",
  catchAsync(async (req, res) => {
    const post = await Blog.findById(req.params.id);
    console.log(req.query);
    var likes = post.likes || 0;
    if (req.query == "like") {
      likes++;
    } else likes--;
    await Blog.findByIdAndUpdate(req.params.id, { likes: likes });
    console.log(post.likes);
    res.redirect(`/blogs/${req.params.id}`);
  })
);
module.exports = router;
