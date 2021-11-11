const express = require('express')
const bodyParser = require('body-parser')
const blogsCtrl = require('../controllers/blogsCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

const router = express();
router.use(bodyParser.urlencoded({extended: true}));


router.post('/postBlog',auth, blogsCtrl.postBlog)

router.post('/voteBlog', auth,blogsCtrl.voteBlog)

router.delete('/deleteBlog',auth, blogsCtrl.deleteBlog)

router.post('/postComment',auth, blogsCtrl.postComment)

router.post('/voteComment',auth, blogsCtrl.voteComment)

router.delete('/deleteComment',auth, blogsCtrl.deleteComment)


module.exports = router