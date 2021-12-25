const Users = require("../models/userModel").userModel;

const authAdmin = async (req, res, next) => {
  try {
    const user = await Users.findOne({ _id: req.user.id });

    if (user.role !== 2)
      return res.status(500).json({ msg: "Doctor resources access denied." });

    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = authAdmin;
