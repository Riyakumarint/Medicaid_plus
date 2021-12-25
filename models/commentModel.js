const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    blogId: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
      required: true,
    },
    upvote: Number,
    downvote: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = {
  commentSchema: commentSchema,
  commentModel: mongoose.model("Comments", commentSchema),
};
