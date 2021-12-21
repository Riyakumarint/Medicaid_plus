const express = require('express')
const bodyParser = require('body-parser')
const profilesCtrl = require('../controllers/profilesCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

const router = express();
router.use(bodyParser.urlencoded({extended: true}));


router.post('/createMedicalHistory',auth, profilesCtrl.createMedicalHistory)
router.patch('/updateMedicalHistory',auth, profilesCtrl.updateMedicalHistory)
router.get('/getMedicalHistory',auth, profilesCtrl.getMedicalHistory)
router.post('/addCurrMedicines',auth, profilesCtrl.addCurrMedicines)
router.post('/deleteCurrMedicines',auth, profilesCtrl.deleteCurrMedicines)
router.post('/addMedCondition',auth, profilesCtrl.addMedCondition)
router.post('/deleteMedCondition',auth, profilesCtrl.deleteMedCondition)
router.post('/addAllergies',auth, profilesCtrl.addAllergies)
router.post('/deleteAllergies',auth, profilesCtrl.deleteAllergies)

router.post('/createMedicalProfile',auth, profilesCtrl.createMedicalProfile)
router.patch('/updateMedicalProfile',auth, profilesCtrl.updateMedicalProfile)
router.get('/getMedicalProfile',auth, profilesCtrl.getMedicalProfile)
router.post('/addQualification',auth, profilesCtrl.addQualification)
router.post('/deleteQualification',auth, profilesCtrl.deleteQualification)

router.post('/rateDoctor', auth,profilesCtrl.rateDoctor)
router.post('/commentDoctor',auth, profilesCtrl.commentDoctor)
router.delete('/deleteCommentDoctor', auth, profilesCtrl.deleteCommentDoctor)


module.exports = router