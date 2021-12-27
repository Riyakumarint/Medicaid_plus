const mongoose = require("mongoose");

const SlotSchema = new mongoose.Schema(
  {
    doctID: {
      type: String,
    },
    patientID: {
      type: String,
    },
    patientName: {
      type: String,
    },
    date: {
      type: Date,
    },
    status: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Slot", SlotSchema);
