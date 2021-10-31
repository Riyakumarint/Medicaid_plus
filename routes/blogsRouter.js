const express = require('express')
const bodyParser = require('body-parser')
const blogsCtrl = require('../controllers/blogsCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

const router = express();
router.use(bodyParser.urlencoded({extended: true}));


router.post('/postBlog', blogsCtrl.postBlog)

router.post('/voteBlog', blogsCtrl.voteBlog)

router.delete('/deleteBlog', blogsCtrl.deleteBlog)

router.post('/postComment', blogsCtrl.postComment)

router.post('/voteComment', blogsCtrl.voteComment)

router.delete('/deleteComment', blogsCtrl.deleteComment)


module.exports = router