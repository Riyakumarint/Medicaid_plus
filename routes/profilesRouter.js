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

router.post('/createMedicalProfile',auth, profilesCtrl.createMedicalProfile)
router.patch('/updateMedicalProfile',auth, profilesCtrl.updateMedicalProfile)
router.get('/getMedicalProfile',auth, profilesCtrl.getMedicalProfile)

router.post('/rateDoctor', auth,profilesCtrl.rateDoctor)

router.post('/commentDoctor',auth, profilesCtrl.commentDoctor)

router.delete('/deleteCommentDoctor', auth, profilesCtrl.deleteCommentDoctor)


module.exports = router