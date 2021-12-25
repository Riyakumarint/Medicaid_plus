const mongoose = require("mongoose");

const medicalHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    emergencyContact: {
      name: {
        type: String,
        required: true,
      },
      relation: {
        type: String,
        required: true,
      },
      emailAdd: {
        type: String,
        required: true,
        trim: true,
      },
      mobile: {
        type: String,
        required: true,
        default: "",
      },
      address: {
        type: String,
        default: "",
      },
    },

    bloodGroup: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
      default: "",
    },
    height: {
      type: String,
      default: "",
    },
    weight: {
      type: String,
      default: "",
    },
    pulse: {
      type: String,
      default: "",
    },
    bloodSugar: {
      type: String,
      default: "",
    },
    oxygenLevel: {
      type: String,
      default: "",
    },
    currentMedication: [
      {
        name: String,
        dose: String,
      },
    ],
    medicalCondition: [
      {
        name: String,
        fromWhen: String,
        currentStatus: String,
      },
    ],
    allergies: [
      {
        name: String,
      },
    ],
    useTobacco: String,
    useAlcohol: String,

    caseRecord: [
      {
        caseId: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = {
  medicalHistorySchema: medicalHistorySchema,
  medicalHistoryModel: mongoose.model("MedicalHistories", medicalHistorySchema),
};

// sample data to post via postman (delete it)
// {

//     "userId": "61765d2c14967a0ee7a84a7c",

//     "emergencyConstact":{
//         "name": "Riya kumari",
//         "relation": "wife",
//         "emailAdd": "riyakumaribkj@gmail.com",
//         "mobile": "+911111111111",
//         "address": "Aliganj, bkj"
//     },

//     "bloodGroup": "O+",
//     "age":"21",
//     "height": "5' 11''",
//     "weight": "79",

//     "currentMedication": [
//         {
//             "name": "R49",
//             "dose": "10 drops 3 times a day"
//         }
//     ],
//     "medicalCondition": [
//         {
//             "name": "Covid 19",
//             "fromWhen": "5 month back",
//             "currentStatus": "cured"
//         },
//         {
//             "name": "Sinus",
//             "fromWhen": "",
//             "currentStatus": "affected"
//         }
//     ],
//     "allergies": [
//         {
//         "name": "dust"
//         },
//         {
//             "name": "cold"
//         }
//     ],
//     "useTobacco": "NO",
//     "useAlcohol": "NO"
// }
