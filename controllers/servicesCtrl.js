const LabTest = require("../models/labTestModel").LabTestModel;
const Ambulance = require("../models/ambulanceModel").AmbulanceModel;
const MedicalProfile =
  require("../models/medicalProfileModel").medicalProfileModel;
const Users = require("../models/userModel").userModel;

const servicesCtrl = {
  getLabTests: async (req, res) => {
    try {
      let Filter = {};
      if (req.body.medicalId !== "") {
        Filter = { ...Filter, medicalId: req.body.medicalId };
      }
      if (req.body.patientID !== "") {
        Filter = { ...Filter, patientID: req.body.patientID };
      }

      const labTests = await LabTest.find(Filter);
      res.json(labTests);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  bookLabTest: async (req, res) => {
    try {
      // console.log(req.body)
      const { name, medicalId, patientID, testName, mobile, address, status } =
        req.body.bookingDetail;

      const newLabTest = new LabTest({
        name,
        medicalId,
        patientID,
        testName,
        mobile,
        address,
        status,
      });

      await newLabTest.save();
      res.json({ msg: "lab test booked" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteLabTest: async (req, res) => {
    try {
      await LabTest.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted lab test" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateLabTest: async (req, res) => {
    try {
      const { name, medicalId, patientID, testName, mobile, address, status } =
        req.body;
      await LabTest.findOneAndUpdate(
        { _id: req.params.id },
        { name, medicalId, patientID, testName, mobile, address, status }
      );
      res.json({ msg: "lab test updated" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getAmbulances: async (req, res) => {
    try {
      let Filter = {};
      if (req.body.medicalId !== "") {
        Filter = { ...Filter, medicalId: req.body.medicalId };
      }
      if (req.body.patientID !== "") {
        Filter = { ...Filter, patientID: req.body.patientID };
      }

      const ambulances = await Ambulance.find(Filter);
      // console.log(ambulances);
      res.json(ambulances);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  bookAmbulance: async (req, res) => {
    try {
      const { name, medicalId, patientID, mobile, address, status } =
        req.body.bookingDetail;

      const newAmbulance = new Ambulance({
        name,
        medicalId,
        patientID,
        mobile,
        address,
        status,
      });

      await newAmbulance.save();
      res.json({ msg: "Ambulance booked" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteAmbulance: async (req, res) => {
    try {
      await Ambulance.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted ambulance" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateAmbulance: async (req, res) => {
    try {
      const { name, medicalId, patientID, mobile, address, status } = req.body;
      await Ambulance.findOneAndUpdate(
        { _id: req.params.id },
        { name, medicalId, patientID, mobile, address, status }
      );
      res.json({ msg: "Ambulance updated" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = servicesCtrl;
