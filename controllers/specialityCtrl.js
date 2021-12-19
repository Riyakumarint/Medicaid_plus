const Speciality = require('../models/specialityModel').specialityModel
const MedicalProfile = require("../models/medicalProfileModel").medicalProfileModel;
const Users = require("../models/userModel").userModel;

const specialityCtrl = {
    getSpecialities: async(req, res) =>{
        try {
           const specialities = await Speciality.find()
            res.json(specialities)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createSpeciality: async (req, res) =>{
        try {
            // if user have role = 1 ---> admin
            // only admin can create , delete and update speciality
            const {name,fee} = req.body;
            const speciality = await Speciality.findOne({name})
            if(speciality) return res.status(400).json({msg: "This speciality already exists."})

            const newSpeciality = new Speciality({name,fee})

            await newSpeciality.save()
            res.json({msg: "Created a speciality"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deletesSpeciality: async(req, res) =>{
        try {
            // const products = await Products.findOne({speciality: req.params.id})
            // if(products) return res.status(400).json({
            //     msg: "Please delete all products with a relationship."
            // })

            await Speciality.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Speciality"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateSpeciality: async(req, res) =>{
        try {
            const {name,fee} = req.body;
            await Speciality.findOneAndUpdate({_id: req.params.id}, {name})

            res.json({msg: "Updated a speciality"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    fetchDoctorBySpeciality: async(req, res) =>{
        try {
            const medical_profiles = await MedicalProfile.find({speciality_name: req.params.speciality_name});
            // console.log(medical_profiles);
            const promises = medical_profiles.map(async (medical_profile) => {
                const doctor = await Users.find({_id: medical_profile.userId});
                // console.log(doctor);
                return {name: doctor[0].name, doctortId: doctor[0]._id};
            })
            const doctorsNameId = await Promise.all(promises);
            // confused what's going on? visit-> https://youtu.be/qfNtVh2RALc
            // console.log(doctorsNameId);
            res.json(doctorsNameId); // returns all the doctors name and there id of that particular speciality
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

}


module.exports = specialityCtrl