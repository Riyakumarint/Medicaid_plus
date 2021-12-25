const Users = require("../models/userModel").userModel;
const MedicalProfile =
  require("../models/medicalProfileModel").medicalProfileModel;
const Blog = require("../models/blogModel").blogModel;
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const fetch = require("node-fetch");

const blogsCtrl = {
  postBlog: async (req, res) => {
    try {
      const newBlog = new Blog({
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        links: req.body.links,
        coverImage: req.body.coverImage,
        reletedTo: req.body.reletedTo,
        autherId: req.user.id,
        auther: req.body.auther,
        createdDate: req.body.createdDate,
      });
      newBlog.save(async (error, result) => {
        if (!error) {
          await MedicalProfile.findOneAndUpdate(
            { userId: req.user.id },
            { $push: { blogRecord: { blogId: result._id } } }
          );
          res.json({ msg: "Blog posted" });
        } else {
          res.status(500).json({ msg: error.message });
        }
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // Get all blogs
  getAllBlogs: async (req, res) => {
    /*let auther = req.query.auther;
        let category = req.query.reletedTo;
        let blogs;
        try {
            if(username) 
            blogs = await Blog.find({ auther: auther });
        else if (category) 
            blogs = await Blog.find({ reletedTo: category });
        else */
    try {
      const blogs = await Blog.find();
      res.json(blogs);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getBlog: async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      res.json(blog);
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteBlog: async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);

      await MedicalProfile.findOneAndUpdate(
        { userId: blog.autherId },
        { $pull: { blogRecord: { blogId: req.params.id } } }
      );

      await Blog.findByIdAndDelete(req.params.id);

      res.json({ msg: "Deleted Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  rateBlog: async (req, res) => {
    try {
      const blog = await Blog.findOne({ _id: req.body.blogId });

      let previousRating = 0;
      let newRating = 0;
      const promises = blog.reviews.rater.map(async (rater) => {
        if (rater.userId === req.user.id) {
          previousRating = rater.rating;
          await Blog.findOneAndUpdate(
            { _id: req.body.blogId },
            {
              $pull: {
                "reviews.rater": {
                  userId: req.user.id,
                  rating: Number(rater.rating),
                },
              },
            }
          );
        }
        return rater;
      });
      const temp = await Promise.all(promises);

      const numberOfRatings = blog.reviews.rater.length;
      const currentRating = Number(blog.reviews.rating);
      const rating = Number(req.body.rating);
      if (previousRating !== 0) {
        newRating =
          (numberOfRatings * currentRating + rating - previousRating) /
          numberOfRatings;
      } else {
        newRating =
          (numberOfRatings * currentRating + rating) / (numberOfRatings + 1);
      }

      await Blog.findOneAndUpdate(
        { _id: req.body.blogId },
        {
          $push: {
            "reviews.rater": {
              userId: req.user.id,
              rating: Number(req.body.rating),
            },
          },
          "reviews.rating": Number(newRating),
        }
      );

      res.json({ msg: "Rating Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  postComment: async (req, res) => {
    try {
      const comment = {
        autherId: req.body.autherId,
        comment: req.body.comment,
        upvote: 0,
        downvote: 0,
      };
      await Blog.findOneAndUpdate(
        { _id: req.body.blogId },
        { $push: { comments: comment } }
      );
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
  deleteComment: async (req, res) => {
    try {
      await Blog.findOneAndUpdate(
        { _id: req.body.blogId },
        { $pull: { comments: { _id: req.body.commentId } } }
        // or we can write { "$pull": { 'comments._id' : req.body.commentId} } }
      );
      res.json({ msg: "Comment delete Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = blogsCtrl;
