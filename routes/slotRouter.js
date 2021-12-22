const router = require('express').Router()
const Slots = require("../models/slot");


// new Slots
router.post("/", async (req, res) => {
    const newSlots = new Slots({
        doctID: req.body.doctID,
        patientID: "",
        date: req.body.date,
        status: false,
    });
    try {
      const savedSlots = await newSlots.save();
      res.status(200).json(savedSlots);
      console.log(savedSlots);
    } catch (err) {
      res.status(500).json(err);
    }
});

//get slots patient
router.get("/:docterId/:date", async (req, res) => {
    try {
      const slot = await Slots.find({
        doctID: req.params.docterId,
      });

      res.status(200).json(slot);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// get slots doctor
router.get("/:docterId", async (req, res) => {
    try {
      console.log(req.params.docterId);
      const slot = await Slots.find({
        doctID: req.params.docterId,
      });

      res.status(200).json(slot);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//delete slot
router.post("/delete/:slotID", async (req, res) => {
  try {
    const slot = await Slots.findOneAndDelete({_id: req.params.slotID});

    res.status(200).json(slot);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router