const Users = require("../models/userModel").userModel;
const Blog = require("../models/blogModel").blogModel;
const Comment = require("../models/commentModel").commentModel;
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const fetch = require("node-fetch");

const commentsCtrl = {
  postComment: async (req, res) => {
    try {
      const comment = await new Comment(req.body);
      comment.save();
      // await Blog.findOneAndUpdate(
      //     { _id: req.body.blogId },
      //     { "$push": { comments: comment } }
      // );
      res.json({ msg: "Comment post Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  voteComment: async (req, res) => {
    try {
      if (req.body.vote === "up") {
        await Blog.findOneAndUpdate(
          { _id: req.body.blogId, "comments._id": req.body.commentId },
          { $inc: { "comments.$.upvote": 1 } }
        );
      } else if (req.body.vote === "down") {
        await Blog.findOneAndUpdate(
          { _id: req.body.blogId, "comments._id": req.body.commentId },
          { $inc: { "comments.$.downvote": 1 } }
        );
      }
      res.json({ msg: "vote register Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getComments: async (req, res) => {
    try {
      const comments = await Comment.find({ blogId: req.params.id });

      res.json(comments);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteComment: async (req, res) => {
    try {
      // console.log(req.params.id);
      const comment = await Comment.findById(req.params.id);
      // console.log(comment);
      await comment.delete();
      res.json({ msg: "Comment delete Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = commentsCtrl;
