const router = require("express").Router();
const Slots = require("../models/slot.js");

function comp(a, b) {
  const a1 = new Date(a.date);
  const b1 = new Date(b.date);
  if (a1.getHours() > b1.getHours()) {
    return 1;
  } else if (a1.getHours() < b1.getHours()) {
    return -1;
  }
  if (a1.getMinutes() > b1.getMinutes()) {
    return 1;
  } else if (a1.getMinutes() < b1.getMinutes()) {
    return -1;
  }
  return 0;
}
function comp1(a, b) {
  const a1 = new Date(a.date);
  const b1 = new Date(b.date);
  if (a1.getFullYear() > b1.getFullYear()) {
    return 1;
  } else if (a1.getFullYear() < b1.getFullYear()) {
    return -1;
  }
  if (a1.getMonth() > b1.getMonth()) {
    return 1;
  } else if (a1.getMonth() < b1.getMonth()) {
    return -1;
  }
  if (a1.getDate() > b1.getDate()) {
    return 1;
  } else if (a1.getDate() < b1.getDate()) {
    return -1;
  }
  if (a1.getHours() > b1.getHours()) {
    return 1;
  } else if (a1.getHours() < b1.getHours()) {
    return -1;
  }
  if (a1.getMinutes() > b1.getMinutes()) {
    return 1;
  } else if (a1.getMinutes() < b1.getMinutes()) {
    return -1;
  }
  return 0;
}
// new Slots
router.post("/", async (req, res) => {
  // console.log(req.body.doctID);
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
router.get("/patient/:docterId/:date", async (req, res) => {
  // console.log( "try " + req.params.docterId + " " + new Date(req.params.date).getDate());
  try {
    const slots = await Slots.find({
      doctID: req.params.docterId,
    });
    // console.log(slots);
    const s = slots.filter(function (slot) {
      return (
        new Date(req.params.date).getDate() === new Date(slot.date).getDate() &&
        new Date(req.params.date).getMonth() ===
          new Date(slot.date).getMonth() &&
        new Date(req.params.date).getYear() === new Date(slot.date).getYear() &&
        slot.status === false
      );
    });
    // console.log(s);
    s.sort(comp);
    res.status(200).json(s);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get slots doctor
router.get("/doctor/:docterId", async (req, res) => {
  try {
    // console.log(req.params.docterId);
    const slot = await Slots.find({
      doctID: req.params.docterId,
    });
    // console.log(slot);
    slot.sort(comp1);
    res.status(200).json(slot);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete slot
router.post("/delete/:slotId", async (req, res) => {
  // console.log("HHIHIHI");
  try {
    const slot = await Slots.findOneAndDelete({ _id: req.params.slotId });
    // console.log(slot);
    res.status(200).json(slot);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//book slots
router.post("/book/:slotId/:patientId", async (req, res) => {
  // console.log("HHIHIHI");
  try {
    await Slots.findOneAndUpdate(
      { _id: req.params.slotId },
      {
        patientID: req.params.patientId,
        status: true,
        patientName: req.body.patientName,
      }
    );
    //console.log(slot);
    res.status(200).json({ msg: "Update Success!" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//reshedule Slot
router.post("/reshedule/:slotId/:date", async (req, res) => {
  // console.log("HHIHIHI");
  try {
    await Slots.findOneAndUpdate(
      { _id: req.params.slotId },
      { date: req.params.date }
    );
    //console.log(slot);
    res.status(200).json({ msg: "Update Success!" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
