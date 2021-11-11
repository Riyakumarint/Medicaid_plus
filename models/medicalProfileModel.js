const mongoose = require('mongoose')


const medicalProfileSchema = new mongoose.Schema({

    userId:{
        type: String,
        required: true
    },

    bloodGroup: {
        type: String, 
        required: true
    },
    age:{
        type:String,
        required: true,
        default:''
    },

    qualification: [{
        major: String,
        college: String,
        passingyear: String
    }],
    speciality: [{
        name: {
            type: String
            // ,
            // required: true
        }
    }],
    experience: {
        year: {
            type: String
            // ,
            // required: true
        }
    },

    reviews: {
        rating :{
            type: Number,
            default: 3,
            min: 1,
            max: 5
        },
        rater: [{
            userId: {
                type: String,
                unique: true
            }
        }],
        comments: [{
            autherId: String,
            comment: {
                type: String,
                required: true,
                maxlength: 200
            },
        }]
    },

    caseRecord: [{
        caseId: String
    }],
    blogRecord: [{
        blogId: String
    }],

}, 
{
    timestamps: true
})

module.exports = {
    medicalProfileSchema: medicalProfileSchema,
    medicalProfileModel: mongoose.model("MedicalProfiles", medicalProfileSchema)
}


// {
//     "userId": "61765d2c14967a0ee7a84a7c",

//     "bloodGroup": "O+",
//     "age": "21",

//     "qualification": [
//         {
//             "major": "Electrical engineering",
//             "college": "MNNIT",
//             "passingyear": "2023"
//         }
//     ],
//     "speciality": [
//         {
//             "name": "Heart"
//         }
//     ],
//     "experience": {
//         "year": "2"
//     }

// }