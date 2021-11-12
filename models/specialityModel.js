const mongoose = require('mongoose')

const specialitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
}, {
    timestamps: true
})

module.exports = {
    specialitySchema : specialitySchema ,
    specialityModel : mongoose.model("speciality", specialitySchema )
}
