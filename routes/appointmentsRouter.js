const express = require('express')
const bodyParser = require('body-parser')
const appointmentsCtrl = require('../controllers/appointmentsCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

const router = express();
router.use(bodyParser.urlencoded({extended: true}));


router.post('/createAppointment', auth, appointmentsCtrl.createMedicalAppointment)

router.post('/addMedicines', appointmentsCtrl.addMedicines)

router.delete('/deleteMedicines', appointmentsCtrl.deleteMedicines)

router.post('/addTestReports', appointmentsCtrl.addTestReports)

router.post('/updateTestReports', appointmentsCtrl.updateTestReports)

router.delete('/deleteTestReports', appointmentsCtrl.deleteTestReports)

router.post('/updateDoctorsNote', appointmentsCtrl.updateDoctorsNote)

router.post('/updateDoctorsNotePrivate', appointmentsCtrl.updateDoctorsNotePrivate)

router.post('/updatePrescription', appointmentsCtrl.updatePrescription)

router.post('/updateMeetingDetail', appointmentsCtrl.updateMeetingDetail)

router.post('/updateStatus', appointmentsCtrl.updateStatus)

router.get('/fetchAppointments', auth, appointmentsCtrl.fetchAppointments)

module.exports = router