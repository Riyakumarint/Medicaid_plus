const router = require('express').Router()
const specialityCtrl = require('../controllers/specialityCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/speciality')
    .get(specialityCtrl.getSpecialities)
    .post(auth, authAdmin, specialityCtrl.createSpeciality)

router.route('/speciality/:id')
    .delete(auth, authAdmin, specialityCtrl.deletesSpeciality)
    .put(auth, authAdmin, specialityCtrl.updateSpeciality)


module.exports = router