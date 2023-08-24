const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("comment", CommentSchema);
