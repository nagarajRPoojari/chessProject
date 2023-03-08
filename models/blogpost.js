const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require("./comments");
const User = require("./user");

const blogSchema = new Schema({
  title: String,
  image: String,
  likes: Number,
  dislikes: Number,
  description: String,
  date: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

blogSchema.post("findOneAndDelete", async (doc) => {
  if (doc) {
    await Comment.deleteMany({
      _id: {
        $in: doc.comments,
      },
    });
  }
});

module.exports = mongoose.model("Blog", blogSchema);
