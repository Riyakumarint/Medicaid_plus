const express = require('express')
const bodyParser = require('body-parser')
const blogsCtrl = require('../controllers/blogsCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

const router = express();
// const multer = require("multer");

// // STORAGE MULTER CONFIG
// let storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/");
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}_${file.originalname}`);
//     },
//     fileFilter: (req, file, cb) => {
//         const ext = path.extname(file.originalname)
//         if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
//             return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
//         }
//         cb(null, true)
//     }
// })

// const upload = multer({ storage: storage }).single("file");
// router.post("/uploadfiles", (req, res) => {
//     upload(req, res, err => {
//         if (err) {
//             return res.json({ success: false, err });
//         }
//         return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename });
//     });
// });

router.use(bodyParser.urlencoded({extended: true}));


router.post('/postBlog',auth, authAdmin,blogsCtrl.postBlog)

router.post('/voteBlog', auth,blogsCtrl.voteBlog)

router.delete('/deleteBlog',auth,authAdmin, blogsCtrl.deleteBlog)

router.post('/postComment',auth, blogsCtrl.postComment)

router.post('/voteComment',auth, blogsCtrl.voteComment)

router.delete('/deleteComment',auth,authAdmin, blogsCtrl.deleteComment)


module.exports = router