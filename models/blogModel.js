const mongoose = require('mongoose')


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 75
    },
    content : {
        body: {
            type: String,
            required: true,
            trim: true,
            maxlength: 1000
        },
        links: {
            type: String
        },
        coverImage: {
            type: String,
            default: 'https://res.cloudinary.com/dgejdmzwv/image/upload/v1634523773/myimage/user_1_gxw4jy.png'
        } 
    },
    reletedTo:{
        type: String,
        required: true,
        maxlength: 75
    },
    hashtags: [{
        type: String,
        maxlength: 40
    }],
    autherId: String,
    upvote: Number,
    downvote: Number,
    comments: [{
        autherId : String,
        comment: {
            type: String,
            required: true,
            maxlength: 200
        },
        upvote: Number,
        downvote: Number,
    }]
    
}, {
    timestamps: true
})

module.exports = {
    blogSchema: blogSchema,
    blogModel: mongoose.model("Blogs", blogSchema)
}

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