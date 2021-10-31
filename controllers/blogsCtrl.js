const Users = require("../models/userModel").userModel;
const MedicalProfile = require("../models/medicalProfileModel").medicalProfileModel;
const Blog = require("../models/blogModel").blogModel;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("./sendMail")
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const fetch = require("node-fetch");

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);

const { CLIENT_URL } = process.env;

const blogsCtrl = {

    postBlog: async (req, res) => {
        try {
            
            const newBlog = new Blog({
                title: req.body.title,
                "content.body" : req.body.content.body,
                "content.links" : req.body.content.links,
                "content.coverImage": req.body.content.coverImage,
                reletedTo: req.body.reletedTo,
                hashtags: req.body.hashtags,
                autherId: req.body.autherId,
                
            });

            newBlog.save( async (error, result) => {
                if(!error){
                    await MedicalProfile.findOneAndUpdate(
                        { userId: req.body.autherId },
                        { "$push": { blogRecord: {blogId : result._id} } }
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
    voteBlog: async (req, res) => {
        try {
            if(req.body.vote === "up"){
                await Blog.findOneAndUpdate(
                    { _id: req.body.blogId },
                    { "$inc" : {'upvote' : 1} }
                );
            } else if(req.body.vote === "down"){
                await Blog.findOneAndUpdate(
                    { _id: req.body.blogId },
                    { "$inc" : {'downvote' : 1} }
                );
            }
            res.json({ msg: "vote register Success!" });

        } catch (err) {
        return res.status(500).json({ msg: err.message });
        }
    },
    deleteBlog: async (req, res) => {
        try {
            const blog = await Blog.findById( req.body.blogId);

            await MedicalProfile.findOneAndUpdate(
                { userId: blog.autherId },
                { "$pull": { blogRecord: {blogId : req.body.blogId} } }
            );

            await Blog.findByIdAndDelete(req.body.blogId);
    
            res.json({ msg: "Deleted Success!" });

        } catch (err) {
        return res.status(500).json({ msg: err.message });
        }
    },

    postComment: async (req, res) => {
        try {
            const comment = {
                autherId : req.body.autherId,
                comment: req.body.comment,
                upvote: 0,
                downvote: 0,
            };
            await Blog.findOneAndUpdate(
                { _id: req.body.blogId },
                { "$push": { comments: comment } }
            );
            res.json({ msg: "Comment post Success!" });

        } catch (err) {
        return res.status(500).json({ msg: err.message });
        }
    },
    voteComment: async (req, res) => {
        try {
            if(req.body.vote === "up"){
                await Blog.findOneAndUpdate(
                    { _id: req.body.blogId, 'comments._id': req.body.commentId },
                    { "$inc" : {'comments.$.upvote' : 1} }
                );
            } else if(req.body.vote === "down"){
                await Blog.findOneAndUpdate(
                    { _id: req.body.blogId, 'comments._id': req.body.commentId },
                    { "$inc" : {'comments.$.downvote' : 1} }
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
                { "$pull": { comments: {_id : req.body.commentId} } }
                // or we can write { "$pull": { 'comments._id' : req.body.commentId} } }
            );
            res.json({ msg: "Comment delete Success!" });

        } catch (err) {
        return res.status(500).json({ msg: err.message });
        }
    },
      

};


module.exports = blogsCtrl;