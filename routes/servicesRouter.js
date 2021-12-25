const express = require("express");
const bodyParser = require("body-parser");
const servicesCtrl = require("../controllers/servicesCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

const router = express();
router.use(bodyParser.urlencoded({ extended: true }));

router
  .route("/labTest")
  .put(auth, servicesCtrl.getLabTests)
  .post(auth, servicesCtrl.bookLabTest);

router
  .route("/labTest/:id")
  .delete(auth, servicesCtrl.deleteLabTest)
  .put(auth, servicesCtrl.updateLabTest);

router
  .route("/ambulance")
  .put(auth, servicesCtrl.getAmbulances)
  .post(auth, servicesCtrl.bookAmbulance);

router
  .route("/ambulance/:id")
  .delete(auth, servicesCtrl.deleteAmbulance)
  .put(auth, servicesCtrl.updateAmbulance);

module.exports = router;
