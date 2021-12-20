const express = require('express')
const bodyParser = require('body-parser')
const commentsCtrl = require('../controllers/commentsCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const authDoctor = require('../middleware/authDoctor')

const router = express();

router.use(bodyParser.urlencoded({extended: true}));

router.post('/postComment',auth, commentsCtrl.postComment)

router.post('/voteComment',auth, commentsCtrl.voteComment)
router.get('/getComments',commentsCtrl.getComments)
router.delete('/deleteComment',auth,authAdmin, commentsCtrl.deleteComment)


module.exports = router