if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");

const User = require("./models/user");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const ExpressError = require("./utills/ExpressError");

const { isLoggedin } = require("./middleware");

const passport = require("passport");
const LocalStratagy = require("passport-local");

const blogsRoutes = require("./routes/blogs");
const commentsRoutes = require("./routes/comments");

const UserRoutes = require("./routes/users");

const server = require("http").Server(app);
const io = require("socket.io")(server);
const { v4: uuidV4 } = require("uuid");

mongoose.set("strictQuery", false);

const MongoStore = require("connect-mongo")(session);

const dbUrl = "mongodb://localhost:27017/blogdb";
//"mongodb://localhost:27017/blogdb"
//process.env.DB_URL
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connection successfull");
  })
  .catch((e) => {
    console.log("databse connection unsuccessfull  " + e);
  });

app.set("view engine", "ejs");
app.use(express.static("public"));
app.engine("ejs", ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));

const store = new MongoStore({
  url: dbUrl,
  secret: "ooops",
  touchAfter: 24 * 60 * 60,
});

store.on("error", (err) => {
  console.log("mongo store errro " + err);
});

const sessionConfig = {
  store,
  secret: "omg",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 10000 * 60 * 60 * 60,
    maxAge: 10000 * 60 * 60 * 60,
  },
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratagy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});
app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.get("/invite", isLoggedin, (req, res) => {
  req.originalUrl = req.url;
  res.render("chess/invite.ejs", { id: uuidV4() });
});

app.use("/user", UserRoutes);
app.use("/blogs", blogsRoutes);
app.use("/blogs/:id/comments", commentsRoutes);

let timeLimit = 10;
app.get("/:room", isLoggedin, (req, res) => {
  res.render("chess/chessPage/main.ejs", {
    roomId: req.params.room,
    timeLimit: timeLimit,
  });
});

app.post("/:room", isLoggedin, (req, res) => {
  timeLimit = parseInt(req.body.time);
  res.redirect(`/${req.params.room}`);
});

//<---------------------------- error handler------------------------------------->

app.all("*", (req, res, next) => {
  next(new ExpressError("Page not found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oops! Something went wrong";
  res.status(statusCode).render("error.ejs", { err });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId, userProfile) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-connected", userId, userProfile);

    socket.on("name-exchange", (userProfile, timeLimit) => {
      socket.to(roomId).emit("name-exchange", userProfile, timeLimit);
    });

    socket.on("move", (data) => {
      socket.to(roomId).emit("move-made", data);
    });

    socket.on("message", (msg) => {
      socket.to(roomId).emit("message", msg);
    });
    socket.on("disconnect", () => {
      socket.to(roomId).emit("user-disconnected", userId);
    });
  });
});

server.listen(3000);
