const express = require("express");
const bodyParser = require("body-parser");
const profilesCtrl = require("../controllers/profilesCtrl");
const auth = require("../middleware/auth");

const router = express();
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/createMedicalHistory", auth, profilesCtrl.createMedicalHistory);
router.patch("/updateMedicalHistory", auth, profilesCtrl.updateMedicalHistory);
router.patch(
  "/updateMedicalHistory_doc/:userId",
  auth,
  profilesCtrl.updateMedicalHistory_doc
);
router.get("/getMedicalHistory", auth, profilesCtrl.getMedicalHistory);
router.post("/addCurrMedicines", auth, profilesCtrl.addCurrMedicines);
router.post(
  "/addCurrMedicines_doc/:ID",
  auth,
  profilesCtrl.addCurrMedicines_doc
);
router.post("/deleteCurrMedicines", auth, profilesCtrl.deleteCurrMedicines);
router.post(
  "/deleteCurrMedicines_doc/:ID",
  auth,
  profilesCtrl.deleteCurrMedicines_doc
);
router.post("/addMedCondition", auth, profilesCtrl.addMedCondition);
router.post("/addMedCondition_doc/:id", auth, profilesCtrl.addMedCondition_doc);
router.post("/deleteMedCondition", auth, profilesCtrl.deleteMedCondition);
router.post(
  "/deleteMedCondition_doc/:id",
  auth,
  profilesCtrl.deleteMedCondition_doc
);
router.post("/addAllergies", auth, profilesCtrl.addAllergies);
router.post("/deleteAllergies", auth, profilesCtrl.deleteAllergies);
router.post("/addAllergies_doc/:id", auth, profilesCtrl.addAllergies_doc);
router.post("/deleteAllergies_doc/:id", auth, profilesCtrl.deleteAllergies_doc);

router.post("/createMedicalProfile", auth, profilesCtrl.createMedicalProfile);
router.patch("/updateMedicalProfile", auth, profilesCtrl.updateMedicalProfile);
router.get("/getMedicalProfile", auth, profilesCtrl.getMedicalProfile);
router.get(
  "/getMedicalProfile_doc/:userID",
  auth,
  profilesCtrl.getMedicalProfile_user
);
router.get("/fetchDoctor/:doctorId", profilesCtrl.fetchDoctor);
router.post("/addQualification", auth, profilesCtrl.addQualification);
router.post("/deleteQualification", auth, profilesCtrl.deleteQualification);

router.post("/rateDoctor", auth, profilesCtrl.rateDoctor);
router.post("/commentDoctor", auth, profilesCtrl.commentDoctor);
router.delete("/deleteCommentDoctor", auth, profilesCtrl.deleteCommentDoctor);

router.post("/fetchBlogs", profilesCtrl.fetchBlogs);

module.exports = router;
