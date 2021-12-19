const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blogSchema =  mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 75,
    },
    description: {
      type: String,
      required: true,
      maxlength: 200,
    },
    content: {
      type: String,
      required: true,
    },
    links: {
      type: String,
    },
    coverImage: {
      type: String,
      default:
        "https://res.cloudinary.com/dgejdmzwv/image/upload/v1639873739/medicare/shutterstock_1475783396_lndeeo.jpg",
    },
  //   hashtags: [{
  //     name: String
  // }],
    reletedTo: {
      type: String,
      required: true,
      maxlength: 75,
    },
    createdDate: {
      type: Date
    },
    autherId: {
      type: Schema.Types.ObjectId,
      ref: "UserModel",
    },
    auther: {
      type: String,
      required: true
    },
    upvote: Number,
    downvote: Number,
    // date: { type: Date, required: true },
    comments: [
      {
        autherId: {
          type: Schema.Types.ObjectId,
          ref: "UserModel",
        },
        comment: {
          type: String,
          required: true,
          maxlength: 200,
        },
        upvote: Number,
        downvote: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = {
  blogSchema: blogSchema,
  blogModel: mongoose.model("Blogs", blogSchema),
};

// {
//     "title": "Covid 19 pendemic prevention",
//     "content" : {
//         "body": "get vacine, stay safe",
//         "links": "blank",
//         "coverImage": "https://res.cloudinary.com/dgejdmzwv/image/upload/v1634523773/myimage/user_1_gxw4jy.png"
//     },
//     "reletedTo":"covid 19",
//     "hashtags": [
//         "covid", "statHomeStaySafe"
//     ],
//     "autherId": "61760cc64f2aa35608469158"
// }
