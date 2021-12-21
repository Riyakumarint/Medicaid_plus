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

                patienttId: req.body.appointmentDetail.patienttId,
                doctortId: req.body.appointmentDetail.doctortId,
                patient_name:req.body.appointmentDetail.patient_name,   
                doctor_name:req.body.appointmentDetail.doctort_name,
                status: req.body.appointmentDetail.status,    
                title: req.body.appointmentDetail.title,
                description: req.body.appointmentDetail.description,
                symptoms: req.body.appointmentDetail.symptoms,
                previousMedicine: req.body.appointmentDetail.previousMedicine,
                previousTestReports: req.body.appointmentDetail.previousTestReports,
                meetingDetail: req.body.appointmentDetail.meetingDetail,  
            });

            newAppointmentData.save( async (error, result) => {
                if(!error){
                    await MedicalHistory.findOneAndUpdate(
                        { userId: req.body.appointmentDetail.patienttId },
                        { "$push": { caseRecord: {caseId : result._id} } }
                    );
                    await MedicalProfile.findOneAndUpdate(
                        { userId: req.body.appointmentDetail.doctortId },
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
                { _id: req.body.caseId, 'testReports._id': req.body.testId },
                { 'testReports.$.link' : req.body.link }
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
                { doctorsNote: req.body.doctorsNote,
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

    fetchAppointments: async (req, res) => {
        try {
            const user = await Users.find({_id: req.user.id});
            // console.log(user);
            if(user[0].role===2){
                const appointments = await Appointment.find({doctortId: req.user.id});
                res.json(appointments);
            }
            else{
                const appointments = await Appointment.find({patienttId: req.user.id});
                res.json(appointments);
            }
            

        } catch (err) {
        return res.status(500).json({ msg: err.message });
        }
    },

    fetchAppointment: async (req, res) => {
        try {
            // console.log(req.params)
            const appointments = await Appointment.find({_id: req.params.caseId});
            res.json(appointments[0]);
        } catch (err) {
        return res.status(500).json({ msg: err.message });
        }
    },

};


module.exports = appointmentsCtrl;