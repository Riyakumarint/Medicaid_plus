const router = require("express").Router();
const uploadImage = require("../middleware/uploadImage");
const uploadPdf = require("../middleware/pdf");
const uploadCoverImage = require("../middleware/uploadCoverImage");
const uploadCtrl = require("../controllers/uploadCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.post("/upload_avatar", uploadImage, auth, uploadCtrl.uploadAvatar);
router.post(
  "/upload_coverImage",
  uploadCoverImage,
  auth,
  uploadCtrl.uploadCoverImage
);
router.post("/upload_pdf", uploadPdf, auth, uploadCtrl.uploadpdf);
router.post("/delete", uploadCtrl.deleteImage);

module.exports = router;
