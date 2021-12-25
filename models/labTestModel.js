const mongoose = require("mongoose");

const LabTestSchema = new mongoose.Schema(
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
    testName: {
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
      default: "Sample pickup scheduled",
    },
  },
  { timestamps: true }
);

module.exports = {
  LabTestSchema: LabTestSchema,
  LabTestModel: mongoose.model("LabTest", LabTestSchema),
};
