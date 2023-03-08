const express = require("express");
const router = express.Router();
const catchAsync = require("../utills/catchAsync");
const User = require("../models/user");
const passport = require("passport");
const { isLoggedin } = require("../middleware");

router.get(
  "/register",
  catchAsync(async (req, res) => {
    res.render("users/register.ejs");
  })
);

router.post(
  "/register",
  catchAsync(async (req, res) => {
    try {
      const { email, username, password, skill } = req.body;
      const newUser = await new User({ email, username, skill });
      const registerdUser = await User.register(newUser, password);
      req.login(registerdUser, (err) => {
        if (err) return next(err);
        else {
          req.flash("success", "Successfully registered");
          res.redirect("/blogs");
        }
      });
    } catch (err) {
      req.flash("error", "User already exist");
      res.redirect("/blogs");
    }
  })
);

router.get(
  "/login",
  catchAsync(async (req, res) => {
    res.render("users/login.ejs");
  })
);

router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  catchAsync(async (req, res) => {
    req.flash("success", "Welcome back.");
    console.log(req.session.returnTo);
    const redirectUrl = req.session.returnTo || "/blogs";
    res.redirect(redirectUrl);
  })
);

router.get(
  "/logout",
  catchAsync(async (req, res) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Successfully logged out");
      res.redirect("/blogs");
    });
  })
);

router.get(
  "/profile/:id",
  catchAsync(async (req, res) => {
    const user = await User.findById(req.params.id);
    res.render("users/profile.ejs", { user });
  })
);

router.post(
  "/profile/:id/friends",
  catchAsync(async (req, res) => {
    const user = await User.findById(req.params.id);
    console.log(req.params.body);
  })
);

module.exports = router;
