const Users = require("../models/userModel").userModel;
const MedicalHistory =
  require("../models/medicalHistoryModel").medicalHistoryModel;
const MedicalProfile =
  require("../models/medicalProfileModel").medicalProfileModel;
const Appointment = require("../models/appointmentModel").appointmentModel;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const rescheduleEmail = require("./rescheduleEmail");
const scheduleEmail = require("./scheduleEmail");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const fetch = require("node-fetch");

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);

const { CLIENT_URL } = process.env;

const appointmentsCtrl = {
  createMedicalAppointment: async (req, res) => {
    try {
      const newAppointmentData = new Appointment({
        patienttId: req.body.appointmentDetail.patienttId,
        doctortId: req.body.appointmentDetail.doctortId,
        patient_name: req.body.appointmentDetail.patient_name,
        doctor_name: req.body.appointmentDetail.doctor_name,
        status: req.body.appointmentDetail.status,
        mode: req.body.appointmentDetail.mode,
        clinic_address: req.body.appointmentDetail.clinic_address,
        title: req.body.appointmentDetail.title,
        description: req.body.appointmentDetail.description,
        symptoms: req.body.appointmentDetail.symptoms,
        previousMedicine: req.body.appointmentDetail.previousMedicine,
        previousTestReports: req.body.appointmentDetail.previousTestReports,
        meetingDetail: req.body.appointmentDetail.meetingDetail,
      });

      newAppointmentData.save(async (error, result) => {
        if (!error) {
          await MedicalHistory.findOneAndUpdate(
            { userId: req.body.appointmentDetail.patienttId },
            { $push: { caseRecord: { caseId: result._id } } }
          );
          await MedicalProfile.findOneAndUpdate(
            { userId: req.body.appointmentDetail.doctortId },
            { $push: { caseRecord: { caseId: result._id } } }
          );
          scheduleEmail(
            req.body.patient_email,
            req.body.appointmentDetail.patient_name,
            req.body.appointmentDetail.doctor_name,
            req.body.appointmentDetail.mode,
            req.body.appointmentDetail.meetingDetail,
          );
          res.json({ msg: "Appointment created!" });
        } else {
          res.status(500).json({ msg: error.message });
        }
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  addMedicines: async (req, res) => {
    try {
      await Appointment.findOneAndUpdate(
        { _id: req.body.caseId },
        { medicines: req.body.medicines }
      );
      res.json({ msg: "New med. added!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addTestReports: async (req, res) => {
    try {
      await Appointment.findOneAndUpdate(
        { _id: req.body.caseId },
        { testReports: req.body.testReports }
      );
      res.json({ msg: "New test added!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateTestReports: async (req, res) => {
    try {
      await Appointment.findOneAndUpdate(
        { _id: req.body.caseId, "testReports._id": req.body.testId },
        { "testReports.$.link": req.body.link }
      );
      res.json({ msg: "Test report updated!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateDoctorsNote: async (req, res) => {
    try {
      await Appointment.findOneAndUpdate(
        { _id: req.body.caseId },
        {
          doctorsNote: req.body.doctorsNote,
          doctorsNotePrivate: req.body.doctorsNotePrivate,
        }
      );
      res.json({ msg: "Note updated!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updatePrescription: async (req, res) => {
    try {
      await Appointment.findOneAndUpdate(
        { _id: req.body.caseId },
        { prescription: req.body.link }
      );
      res.json({ msg: "Prescription updated!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateMeetingDetail: async (req, res) => {
    try {
      await Appointment.findOneAndUpdate(
        { _id: req.body.caseId },
        {
          "meetingDetail.date": req.body.meetingDetail.date,
          "meetingDetail.time": req.body.meetingDetail.time,
        }
      );
      res.json({ msg: "Meeting details updated!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateStatus: async (req, res) => {
    try {
      await Appointment.findOneAndUpdate(
        { _id: req.body.caseId },
        { status: req.body.status }
      );
      res.json({ msg: "Status updated!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  fetchAppointments: async (req, res) => {
    try {
      const user = await Users.find({ _id: req.user.id });
      if (user[0].role === 2) {
        const appointments1 = await Appointment.find({
          doctortId: req.user.id,
        });
        const appointments2 = await Appointment.find({
          patienttId: req.user.id,
        });
        res.json({ asDoctor: appointments1, asPatient: appointments2 });
      } else {
        const appointments = await Appointment.find({
          patienttId: req.user.id,
        });
        res.json({ asDoctor: [], asPatient: appointments });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  fetchAppointment: async (req, res) => {
    try {
      // console.log(req.params)
      const appointments = await Appointment.find({ _id: req.params.caseId });
      res.json(appointments[0]);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  reshedule: async (req, res) => {
    try {
      // console.log(req. params);
      await Appointment.findOneAndUpdate(
        { _id: req.params.apppointmentID },
        { meetingDetail: req.params.date }
      );
      // patient_email, patient_name,doc_name, prevDate,newDate
      
      
      // console.log(req.body.patientEmail)
      rescheduleEmail(
        req.body.patientEmail,
        req.body.patientName,
        req.body.doctorName,
        req.body.prevDate,
       req.params.date
      );
  
      // console.log(apppointmentID)
      // console.log(req.params.date)
      res.json({ msg: "Update Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getdata1: async (req, res) => {
    // console.log("hi");
    try {
      var company_id = req.params.ID;
      var start = new Date();
      start.setHours(0, 0, 0, 0);
      var end = new Date();
      end.setDate(end.getDate() + 7);
      end.setHours(23, 59, 59, 999);
      const data1 = await Appointment.aggregate([
        {
          $match: {
            $and: [
              { entry_date: { $gt: start, $lt: end } },
              { company_id: "" + company_id + "" },
            ],
          },
        },
        { $sort: { entry_date: -1 } },
        {
          $group: {
            _id: {
              day: { $dayOfMonth: "$meetingDetail" },
              month: { $month: "$meetingDetail" },
              year: { $year: "$meetingDetail" },
            },
            count: { $sum: 1 },
            entry_date: { $first: "$meetingDetail" },
          },
        },
        {
          $project: {
            entry_date: {
              $dateToString: { format: "%Y-%m-%d", date: "$entry_date" },
            },
            count: 1,
            _id: 0,
          },
        },
      ]);
      // console.log(data1);
      return res.status(200).json(data1);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = appointmentsCtrl;
