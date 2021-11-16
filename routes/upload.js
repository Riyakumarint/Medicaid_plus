const router = require('express').Router()
const uploadImage = require('../middleware/uploadImage')
const uploadCoverImage = require('../middleware/uploadCoverImage')
const uploadCtrl = require('../controllers/uploadCtrl')
const auth = require('../middleware/auth')

router.post('/upload_avatar', uploadImage, auth, uploadCtrl.uploadAvatar)
router.post('/upload_coverImage', uploadCoverImage, auth, uploadCtrl.uploadCoverImage)


module.exports = router