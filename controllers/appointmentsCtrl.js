const Users = require("../models/userModel").userModel;
const MedicalHistory = require("../models/medicalHistoryModel").medicalHistoryModel;
const MedicalProfile = require("../models/medicalProfileModel").medicalProfileModel;
const Appointment = require("../models/appointmentModel").appointmentModel;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("./sendMail")
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const fetch = require("node-fetch");

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);

const { CLIENT_URL } = process.env;

const appointmentsCtrl = {
  
    createMedicalAppointment: async (req, res) => {
        try {
            
            const newAppointmentData = new Appointment({

                patienttId: req.body.patienttId,
                doctortId: req.body.doctortId,
                status: req.body.status,
                date: req.body.date,
            
                title: req.body.title,
                description: req.body.description,
                symptoms: req.body.symptoms,
                previousMedicine: req.body.previousMedicine,
                previousTestReports: req.body.previousTestReports,
            
                meetingDetail: req.body.meetingDetail,
                
            });

            newAppointmentData.save( async (error, result) => {
                if(!error){
                    await MedicalHistory.findOneAndUpdate(
                        { userId: req.body.patienttId },
                        { "$push": { caseRecord: {caseId : result._id} } }
                    );
                    await MedicalProfile.findOneAndUpdate(
                        { userId: req.body.doctortId },
                        { "$push": { caseRecord: {caseId : result._id} } }
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
            const newMedicine = {
                name: req.body.name,
                dose: req.body.dose
            };
            await Appointment.findOneAndUpdate(
                { _id: req.body.caseId },
                { "$push": { medicines: newMedicine } }
            );
            res.json({ msg: "New med. added!" });

        } catch (err) {
        return res.status(500).json({ msg: err.message });
        }
    },
    deleteMedicines: async (req, res) => {
        try {
            await Appointment.findOneAndUpdate(
                { _id: req.body.caseId },
                { "$pull": { medicines: {_id : req.body.medicineId} } }
            );
            res.json({ msg: "Medicine delete Success!" });

        } catch (err) {
        return res.status(500).json({ msg: err.message });
        }
    },

    addTestReports: async (req, res) => {
        try {
            const newTestReports = {
                name: req.body.name,
                link: ''
            };
            await Appointment.findOneAndUpdate(
                { _id: req.body.caseId },
                { "$push": { testReports: newTestReports } }
            );
            res.json({ msg: "New test added!" });

        } catch (err) {
        return res.status(500).json({ msg: err.message });
        }
    },
    updateTestReports: async (req, res) => {
        try {
            await Appointment.findOneAndUpdate(
                { _id: req.body.caseId, 'testReports._id': req.body.testId },
                { 'testReports.$.link' : req.body.link }
            );
            res.json({ msg: "Test report updated!" });

        } catch (err) {
        return res.status(500).json({ msg: err.message });
        }
    },
    deleteTestReports: async (req, res) => {
        try {
            await Appointment.findOneAndUpdate(
                { _id: req.body.caseId },
                { "$pull": { testReports: {_id : req.body.testId} } }
            );
            res.json({ msg: "Test delete Success!" });

        } catch (err) {
        return res.status(500).json({ msg: err.message });
        }
    },

    updateDoctorsNote: async (req, res) => {
        try {
            await Appointment.findOneAndUpdate(
                { _id: req.body.caseId },
                { doctorsNote: req.body.note  }
            );
            res.json({ msg: "Note updated!" });

        } catch (err) {
        return res.status(500).json({ msg: err.message });
        }
    },
    updateDoctorsNotePrivate: async (req, res) => {
        try {
            await Appointment.findOneAndUpdate(
                { _id: req.body.caseId },
                { doctorsNotePrivate: req.body.note  }
            );
            res.json({ msg: "Private Note updated!" });

        } catch (err) {
        return res.status(500).json({ msg: err.message });
        }
    },
    updatePrescription: async (req, res) => {
        try {
            await Appointment.findOneAndUpdate(
                { _id: req.body.caseId },
                { prescription: req.body.link  }
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
                { "meetingDetail.date": req.body.meetingDetail.date,
                  "meetingDetail.time": req.body.meetingDetail.time  }
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
                { status: req.body.status  }
            );
            res.json({ msg: "Status updated!" });

        } catch (err) {
        return res.status(500).json({ msg: err.message });
        }
    },

};


module.exports = appointmentsCtrl;