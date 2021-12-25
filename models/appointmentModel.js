const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patienttId: {
      type: String, // patient's user id
      required: true,
    },
    patient_name: {
      type: String, // patient's user id
      required: true,
    },

    doctortId: {
      type: String, // doctor's user id
      required: true,
    },
    doctor_name: {
      type: String, // doctor's user id
    },

    status: {
      type: String, // active or closed
      required: true,
    },
    mode: {
      type: String,
      default: "online",
    },
    clinic_address: {
      type: String,
      default: "",
    },

    title: {
      type: String, // one line description
      required: true,
    },
    description: {
      type: String, // detailed description
      required: true,
    },
    symptoms: [
      {
        name: String, // symptom name
        fromWhen: String, // been how long. like two days, 1weeks etc.....
      },
    ],
    previousMedicine: [
      {
        name: String, // medicine name
        dose: String, // dose
      },
    ],
    previousTestReports: [
      {
        link: String,
      },
    ],

    // patient medical record can be access by uses id -> profile

    medicines: [
      {
        name: String, // medicine name
        dose: String, // dose
      },
    ],
    testReports: [
      {
        name: String,
        link: String,
      },
    ],
    doctorsNote: {
      type: String,
      default: "",
    },
    doctorsNotePrivate: {
      type: String,
      default: "",
    },
    prescription: {
      type: String,
      default: "",
    },

    meetingDetail: {
      type: String,
    },
    pdfFile: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  appointmentSchema: appointmentSchema,
  appointmentModel: mongoose.model("Appointments", appointmentSchema),
};

// {

//     "patienttId": "61765d2c14967a0ee7a84a7c",
//     "doctortId": "61760cc64f2aa35608469158",
//     "status": "active",
//     "date": "30/10/2021",

//     "title": "title name",
//     "description": "description containt",
//     "symptoms": [{
//         "name": "increase in heart beats",
//         "fromWhen": "tow years"
//     }],
//     "previousMedicine": [
//         {
//             "name": "ILU",
//             "dose": "all day along"
//         }
//     ],
//     "previousTestReports": [
//         {
//             "link": ""
//         }
//     ],
//     "meetingDetail":{
//         "date": "30/10/2021",
//         "time": "8:00 PM"
//     }

// }
