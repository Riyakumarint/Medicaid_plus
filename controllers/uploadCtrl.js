const cloudinary = require("cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadCtrl = {
  uploadAvatar: (req, res) => {
    try {
      const file = req.files.file;

      cloudinary.v2.uploader.upload(
        file.tempFilePath,
        {
          folder: "avatar",
          width: 150,
          height: 150,
          crop: "fill",
        },
        async (err, result) => {
          if (err) throw err;

          removeTmp(file.tempFilePath);

          res.json({ url: result.secure_url });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  uploadCoverImage: (req, res) => {
    try {
      const file = req.files.file;

      cloudinary.v2.uploader.upload(
        file.tempFilePath,
        {
          folder: "coverImage",
          width: 950,
          height: 500,
          crop: "fill",
        },
        async (err, result) => {
          if (err) throw err;

          removeTmp(file.tempFilePath);

          res.json({ url: result.secure_url });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  uploadpdf: (req, res) => {
    try {
      const file = req.files.file;

      cloudinary.v2.uploader.upload(
        file.tempFilePath,
        {
          folder: "pdfFile",
        },
        async (err, result) => {
          if (err) throw err;

          removeTmp(file.tempFilePath);

          res.json({ url: result.secure_url });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteImage: (req, res) => {
    try {
      const { secure_url } = req.body;

      if (!secure_url)
        return res.status(400).json({ msg: "No images Selected" });

      cloudinary.v2.uploader.destroy(secure_url, async (err, result) => {
        if (err) throw err;

        res.json({ msg: "Deleted Image" });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = uploadCtrl;
