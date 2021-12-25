const mongoose = require("mongoose");

const specialitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    fee: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default:
        "https://res.cloudinary.com/dgejdmzwv/image/upload/v1634523773/myimage/user_1_gxw4jy.png",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  specialitySchema: specialitySchema,
  specialityModel: mongoose.model("speciality", specialitySchema),
};
