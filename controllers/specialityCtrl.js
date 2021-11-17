const Speciality = require('../models/specialityModel').specialityModel

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
            const {name} = req.body;
            const speciality = await Speciality.findOne({name})
            if(speciality) return res.status(400).json({msg: "This speciality already exists."})

            const newSpeciality = new Speciality({name})

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
            const {name} = req.body;
            await Speciality.findOneAndUpdate({_id: req.params.id}, {name})

            res.json({msg: "Updated a speciality"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateSpeciality: async (req, res) => {
        try {
            const { name } = req.body;
            await Speciality.findOneAndUpdate({ _id: req.params.id }, { name })

            res.json({ msg: "Updated a speciality" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}


module.exports = specialityCtrl