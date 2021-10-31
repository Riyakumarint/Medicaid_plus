const express = require('express')
const bodyParser = require('body-parser')
const profilesCtrl = require('../controllers/profilesCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

const router = express();
router.use(bodyParser.urlencoded({extended: true}));


router.post('/createMedicalHistory', profilesCtrl.createMedicalHistory)

router.post('/createMedicalProfile', profilesCtrl.createMedicalProfile)

router.post('/rateDoctor', profilesCtrl.rateDoctor)

router.post('/commentDoctor', profilesCtrl.commentDoctor)

router.delete('/deleteCommentDoctor', profilesCtrl.deleteCommentDoctor)


module.exports = router