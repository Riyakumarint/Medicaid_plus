const Speciality = require("../models/specialityModel").specialityModel;
const City = require("../models/cityModel").cityModel;
const MedicalProfile =
  require("../models/medicalProfileModel").medicalProfileModel;
const Users = require("../models/userModel").userModel;

const specialityCtrl = {
  getSpecialities: async (req, res) => {
    try {
      const specialities = await Speciality.find();
      res.json(specialities);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createSpeciality: async (req, res) => {
    try {
      // if user have role = 1 ---> admin
      // only admin can create , delete and update speciality
      const { name, fee, image } = req.body;
      const speciality = await Speciality.findOne({ name });
      if (speciality)
        return res.status(400).json({ msg: "This speciality already exists." });

      const newSpeciality = new Speciality({ name, fee });

      await newSpeciality.save();
      res.json({ msg: "Created a speciality" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deletesSpeciality: async (req, res) => {
    try {
      // const products = await Products.findOne({speciality: req.params.id})
      // if(products) return res.status(400).json({
      //     msg: "Please delete all products with a relationship."
      // })

      await Speciality.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a Speciality" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateSpeciality: async (req, res) => {
    try {
      const { name, fee } = req.body;
      await Speciality.findOneAndUpdate({ _id: req.params.id }, { name, fee });

      res.json({ msg: "Updated a speciality" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getCities: async (req, res) => {
    try {
      const cities = await City.find();
      res.json(cities);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createCity: async (req, res) => {
    try {
      // if user have role = 1 ---> admin
      // only admin can create , delete and update speciality
      const { name } = req.body;
      const city = await City.findOne({ name });
      if (city)
        return res.status(400).json({ msg: "This city already exists." });

      const newCity = new City({ name });

      await newCity.save();
      res.json({ msg: "Created a city" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deletesCity: async (req, res) => {
    try {
      await City.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a City" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateCity: async (req, res) => {
    try {
      const { name } = req.body;
      await City.findOneAndUpdate({ _id: req.params.id }, { name });

      res.json({ msg: "Updated a city" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  fetchDoctors: async (req, res) => {
    try {
      let Filter = {};
      if (req.body.speciality_name !== "") {
        Filter = { ...Filter, speciality_name: req.body.speciality_name };
      }
      if (req.body.city_name !== "") {
        Filter = { ...Filter, city_name: req.body.city_name };
      }

      const medical_profiles = await MedicalProfile.find(Filter);
      // console.log(medical_profiles);
      const promises = medical_profiles.map(async (medical_profile) => {
        // const doctor = await Users.find({_id: medical_profile.userId});
        // console.log(doctor);
        // return {name: medical_profile.name, doctortId: medical_profile.userId, clinic_address: medical_profile.clinic_address};
        return medical_profile;
      });
      const doctorsNameId = await Promise.all(promises);
      // confused what's going on? visit-> https://youtu.be/qfNtVh2RALc
      // console.log(doctorsNameId);
      res.json(doctorsNameId); // returns all the doctors name and there id of that particular speciality
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  fetchSpecialists: async (req, res) => {
    try {
      const doctors = await MedicalProfile.find({
        speciality_name: req.body.speciality_name,
      });
      // console.log(req.body);

      res.json(doctors);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = specialityCtrl;
