const mongoose = require("mongoose");
const Blog = require("../models/blogpost");

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/blogdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connection successfull");
  })
  .catch((e) => {
    console.log("databse connection unsuccessfull  " + e);
  });

const seedDb = async () => {
  for (let i = 0; i < 10; i++) {
    const c = new Blog({
      title: "new chess Opening stratagies ",
      image: "https://source.unsplash.com/random/900%C3%97700/?chess",
      description:
        "Chess Played Quick (CPQ) is Chess.com's series of events where top chess streamers complete bounties for prizes. This special edition is",
      author: "63f9f2ad9acd1a13e68389bb",
      date: new Date().toDateString(),
    });
    await c.save();
    console.log(c);
  }
};
seedDb();
