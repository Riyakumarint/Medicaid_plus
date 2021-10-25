const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25
    },
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar:{
        type: String,
        default: 'https://res.cloudinary.com/dgejdmzwv/image/upload/v1634523773/myimage/user_1_gxw4jy.png'
    },
    role: {
        type: Number,
        default: 0 // 0 = user, 1 = admin
    },
    gender: { type: String, default: 'male' },
    age:{type:String,default:''},
    mobile: {type: String,required: true, default: ''},
    address: { type: String, default: '' },
    website: {type: String, default: ''}
}, {
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema)
