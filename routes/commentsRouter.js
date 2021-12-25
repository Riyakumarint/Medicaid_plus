const express = require("express");
const bodyParser = require("body-parser");
const commentsCtrl = require("../controllers/commentsCtrl");
const auth = require("../middleware/auth");

const router = express();

router.use(bodyParser.urlencoded({ extended: true }));

router.post("/new", commentsCtrl.postComment);
router.get("/comments/:id", commentsCtrl.getComments);
router.delete("/delete/:id", commentsCtrl.deleteComment);

router.post("/voteComment", auth, commentsCtrl.voteComment);
// router.get('/getComments',commentsCtrl.getComments)
// router.delete('/deleteComment',auth,authAdmin, commentsCtrl.deleteComment)

module.exports = router;
