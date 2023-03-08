const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { v4: uuidV4 } = require("uuid");
const ejsMate = require("ejs-mate");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.engine("ejs", ejsMate);

app.get("/", (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

app.get("/:room", (req, res) => {
  console.log(req.params.room);
  res.render("chessBoard.ejs", { roomId: req.params.room });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-connected", userId);

    socket.on("move", (data) => {
      socket.to(roomId).emit("move-made", data);
    });

    socket.on("message", (msg) => {
      console.log(msg);
      socket.broadcast.emit("message", msg);
    });
    socket.on("disconnect", () => {
      socket.to(roomId).emit("user-disconnected", userId);
    });
  });
});

server.listen(3000);
