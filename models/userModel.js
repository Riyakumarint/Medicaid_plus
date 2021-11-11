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
    gender: { 
        type: String, 
        default: 'male' 
    },
    avatar:{
        type: String,
        default: 'https://res.cloudinary.com/dgejdmzwv/image/upload/v1634523773/myimage/user_1_gxw4jy.png'
    },
    role: {
        type: Number,
        default: 0 // 1= admin, 2 = doctor, 0 = user, 
    },
    profile:{
        medicalHistoryId: String,
        medicalProfileId: String
    },
    mobile: {
        type: String,
        required: true, 
        default: ''
    },
    address: { 
        type: String, 
        default: '' 
    },
    website: {
        type: String, 
        default: ''
    },
    
}, 
{
    timestamps: true
})

module.exports = {
    userSchema : userSchema,
    userModel : mongoose.model("Users", userSchema)
}
