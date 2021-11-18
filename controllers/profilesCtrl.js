const Users = require("../models/userModel").userModel;
const MedicalHistory = require("../models/medicalHistoryModel").medicalHistoryModel;
const MedicalProfile = require("../models/medicalProfileModel").medicalProfileModel;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("./sendMail")
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const fetch = require("node-fetch");

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);

const { CLIENT_URL } = process.env;

const profilesCtrl = {
  
    createMedicalHistory: async (req, res) => {
        try {
            const newMedicalHistoryData = new MedicalHistory({
                userId: req.user.id ,

                emergencyContact:{
                    name: req.body.emergencyConstact.name,
                    relation: req.body.emergencyConstact.relation,
                    emailAdd: req.body.emergencyConstact.emailAdd,
                    mobile: req.body.emergencyConstact.mobile,
                    address: req.body.emergencyConstact.address
                },
            
                bloodGroup: req.body.bloodGroup,
                age: req.body.age,
                height: req.body.height,
                weight: req.body.weight,
            
                currentMedication: req.body.currentMedication,
                medicalCondition: req.body.medicalCondition,
                allergies: req.body.allergies,
                useTobacco: req.body.useTobacco,
                useAlcohol: req.body.useAlcohol,
            
            });

            newMedicalHistoryData.save( async (error, result) => {
                if(!error){
                    await Users.findOneAndUpdate(
                        { _id: req.user.id },
                        { "profile.medicalHistoryId": result._id }
                    );
                    res.json({ msg: "Medical history saved!" });
                } else {
                    res.status(500).json({ msg: error.message });
                }
            });
            
        } catch (err) {
        return res.status(500).json({ msg: err.message });
        }
    },
    updateMedicalHistory: async (req, res) => {
        try {
            const {bloodGroup, age, height, weight, useTobacco, useAlcohol} = req.body.profile;
            const emergencyContact = req.body.emergencyContact;
            await MedicalHistory.findOneAndUpdate(
                { userId: req.user.id },
                {bloodGroup, age, height, weight, useTobacco, useAlcohol, emergencyContact}
            );
            res.json({ msg: "Profile updated!" });
        } catch (err) {
        return res.status(500).json({ msg: err.message });
        }
    },
    getMedicalHistory: async (req, res) => {
        try {
            const medical_profile = await MedicalHistory.find({userId: req.user.id});
            res.json(medical_profile[0]);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    addCurrMedicines: async (req, res) => {
        try {
            const newMedicine = {
                name: req.body.currMed.name,
                dose: req.body.currMed.dose
            };
            await MedicalHistory.findOneAndUpdate(
                { userId: req.user.id },
                { "$push": { currentMedication: newMedicine } }
            );
            res.json({ msg: "New med. added!" });

        } catch (err) {
        return res.status(500).json({ msg: err.message });
        }
    },
    deleteCurrMedicines: async (req, res) => {
        try {
            await MedicalHistory.findOneAndUpdate(
                { userId: req.user.id },
                { "$pull": { currentMedication: {_id : req.body.medId} } }
            );
            res.json({ msg: "Medicine delete Success!" });

        } catch (err) {
        return res.status(500).json({ msg: err.message });
        }
    },

    addMedCondition: async (req, res) => {
        try {
            const newMedicalCondition = {
                name: req.body.medCond.name,
                fromWhen: req.body.medCond.fromWhen,
                currentStatus: req.body.medCond.currentStatus,
            };
            await MedicalHistory.findOneAndUpdate(
                { userId: req.user.id },
                { "$push": { medicalCondition: newMedicalCondition } }
            );
            res.json({ msg: "New cond. added!" });

        } catch (err) {
        return res.status(500).json({ msg: err.message });
        }
    },
    deleteMedCondition: async (req, res) => {
        try {
            await MedicalHistory.findOneAndUpdate(
                { userId: req.user.id },
                { "$pull": { medicalCondition: {_id : req.body.condId} } }
            );
            res.json({ msg: "Condition delete Success!" });

        } catch (err) {
        return res.status(500).json({ msg: err.message });
        }
    },

    addAllergies: async (req, res) => {
        try {
            const newAllergie = {
                name: req.body.allergie.name,
            };
            await MedicalHistory.findOneAndUpdate(
                { userId: req.user.id },
                { "$push": { allergies: newAllergie } }
            );
            res.json({ msg: "New allergies. added!" });

        } catch (err) {
        return res.status(500).json({ msg: err.message });
        }
    },
    deleteAllergies: async (req, res) => {
        try {
            await MedicalHistory.findOneAndUpdate(
                { userId: req.user.id },
                { "$pull": { allergies: {_id : req.body.allergieId} } }
            );
            res.json({ msg: "Allergie delete Success!" });

        } catch (err) {
        return res.status(500).json({ msg: err.message });
        }
    },

    createMedicalProfile: async (req, res) => {
        try {
            const newMedicalProfileData = new MedicalProfile({

                userId: req.user.id,
            
                bloodGroup: req.body.bloodGroup,
                age: req.body.age,
                major: req.body.major,
                college: req.body.college,
                passingyear: req.body.passingyear,

                
                speciality_name: req.body.speciality_name,
                experience_year: req.body.experience_year
            
            });

            newMedicalProfileData.save( async (error, result) => {
                if(!error){
                    await Users.findOneAndUpdate(
                        { _id: req.user.id },
                        { "profile.medicalProfileId": result._id }
                    );
                    res.json({ msg: "Profile saved!" });
                } else {
                    res.status(500).json({ msg: error.message });
                }
            });

        } catch (err) {
        return res.status(500).json({ msg: err.message });
        }
    },
    updateMedicalProfile: async (req, res) => {
        try {
            const {bloodGroup, age, major, college, passingyear, speciality_name, experience_year} = req.body.profile;
            await MedicalProfile.findOneAndUpdate(
                { userId: req.user.id },
                {bloodGroup, age, major, college, passingyear, speciality_name, experience_year}
            );
            res.json({ msg: "Profile updated!" });
        } catch (err) {
        return res.status(500).json({ msg: err.message });
        }
    },
    getMedicalProfile: async (req, res) => {
        try {
            const medical_profile = await MedicalProfile.find({userId: req.user.id});
            res.json(medical_profile[0]);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    rateDoctor: async (req, res) => {
        try {
            const doctor = await MedicalProfile.findOne( {userId: req.body.doctorId} );
            const numberOfRatings = doctor.reviews.rater.length;
            const currentRating = Number(doctor.reviews.rating);
            const rating = Number(req.body.rating);
            const newRating = (numberOfRatings*currentRating + rating)/(numberOfRatings+1);
            
            await MedicalProfile.findOneAndUpdate(
                { userId: req.body.doctorId },
                { 
                    "$push" : {'reviews.rater' : {userId: req.user.id}},
                    'reviews.rating' : Number(newRating)  
                }
            );
            
            res.json({ msg: "Rating Success!" });

        } catch (err) {
        return res.status(500).json({ msg: err.message });
        }
    },
    commentDoctor: async (req, res) => {
        try {
            const newComment = {
                autherId : req.body.autherId,
                comment: req.body.comment,
            };

            await MedicalProfile.findOneAndUpdate(
                { userId: req.body.doctorId },
                { "$push": { 'reviews.comments': newComment } }
            );
            res.json({ msg: "Comment post Success!" });

        } catch (err) {
        return res.status(500).json({ msg: err.message });
        }
    },
    deleteCommentDoctor: async (req, res) => {
        try {
            
            await MedicalProfile.findOneAndUpdate(
                { userId: req.body.doctorId },
                { "$pull": { 'reviews.comments': { _id : req.body.commentId} } }
            );
            res.json({ msg: "Comment delete Success!" });

        } catch (err) {
        return res.status(500).json({ msg: err.message });
        }
    },

};


module.exports = profilesCtrl;