const mongoose = require("mongoose");

const AmbulanceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    medicalId: {
      type: String,
      require: true,
    },
    patientID: {
      type: String,
      require: true,
    },
    mobile: {
      type: String,
      required: true,
      default: "+911234567890",
    },
    address: {
      type: String,
      require: true,
      default: "Address",
    },
    status: {
      type: String,
      default: "On the way",
    },
  },
  { timestamps: true }
);

module.exports = {
  AmbulanceSchema: AmbulanceSchema,
  AmbulanceModel: mongoose.model("Ambulance", AmbulanceSchema),
};
