const Blog = require("./models/blogpost");

module.exports.isLoggedin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in ");
    return res.redirect("/user/login");
  }
  next();
};

module.exports.isAuthor = async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog.author.equals(req.user._id)) {
    req.flash("error", "you don't have permission to do that");
    return res.redirect(`/blogs/${req.params.id}`);
  }
  next();
};
