const express = require('express')
const bodyParser = require('body-parser')
const specialityCtrl = require('../controllers/specialityCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

const router = express();
router.use(bodyParser.urlencoded({extended: true}));



// const router = require('express').Router()
// const specialityCtrl = require('../controllers/specialityCtrl')
// const auth = require('../middleware/auth')
// const authAdmin = require('../middleware/authAdmin')

router.route('/speciality')
    .get(specialityCtrl.getSpecialities)
    .post(auth, authAdmin, specialityCtrl.createSpeciality)

router.route('/speciality/:id')
    .delete(auth, authAdmin, specialityCtrl.deletesSpeciality)
    .put(auth, authAdmin, specialityCtrl.updateSpeciality)


router.route('/city')
    .get(specialityCtrl.getCities)
    .post(auth, authAdmin, specialityCtrl.createCity)

router.route('/city/:id')
    .delete(auth, authAdmin, specialityCtrl.deletesCity)
    .put(auth, authAdmin, specialityCtrl.updateCity)

router.post('/fetchDoctors',auth, specialityCtrl.fetchDoctors)

module.exports = router