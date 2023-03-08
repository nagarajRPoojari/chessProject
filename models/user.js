const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  skill: {
    type: String,
    enum: ["new to chess", "beginner", "intermediate", "advanced"],
  },
  freinds: [
    {
      type: String,
    },
  ],
});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
