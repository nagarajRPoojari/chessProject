const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  body: String,
  liked: Boolean,
  dislliked: Boolean,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
