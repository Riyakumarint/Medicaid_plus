const express = require("express");
const bodyParser = require("body-parser");
const appointmentsCtrl = require("../controllers/appointmentsCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

const router = express();
router.use(bodyParser.urlencoded({ extended: true }));

router.post(
  "/createAppointment",
  auth,
  appointmentsCtrl.createMedicalAppointment
);

router.post("/addMedicines", auth, appointmentsCtrl.addMedicines);

router.post("/addTestReports", auth, appointmentsCtrl.addTestReports);

router.post("/updateTestReports", auth, appointmentsCtrl.updateTestReports);

router.post("/updateDoctorsNote", auth, appointmentsCtrl.updateDoctorsNote);

router.post("/updatePrescription", appointmentsCtrl.updatePrescription);

router.post("/updateMeetingDetail", appointmentsCtrl.updateMeetingDetail);

router.post("/updateStatus", appointmentsCtrl.updateStatus);

router.get("/fetchAppointments", auth, appointmentsCtrl.fetchAppointments);

router.get(
  "/fetchAppointment/:caseId",
  auth,
  appointmentsCtrl.fetchAppointment
);

router.post(
  "/resheduleAppointment/:apppointmentID/:date",
  appointmentsCtrl.reshedule
);

router.get("/getdata1/:ID", appointmentsCtrl.getdata1);

module.exports = router;
