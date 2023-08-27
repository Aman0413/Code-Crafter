const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
  mediaUrl: {
    public_id: String,
    url: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  expiresAt: {
    type: Date,
    default: function () {
      return new Date(this.createdAt.getTime() + 24 * 60 * 60 * 1000);
    },
  },
});

module.exports = mongoose.model("story", StorySchema);
