const Users = require("../models/userModel").userModel;
const MedicalHistory =
  require("../models/medicalHistoryModel").medicalHistoryModel;
const MedicalProfile =
  require("../models/medicalProfileModel").medicalProfileModel;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("./sendMail");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const fetch = require("node-fetch");

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);

const { CLIENT_URL } = process.env;

const createMedicalHistory = async (userId) => {
  try {
    const newMedicalHistoryData = new MedicalHistory({
      userId: userId,

      emergencyContact: {
        name: "Name",
        relation: "Relation",
        emailAdd: "Email",
        mobile: "Mobile",
        address: "Address",
      },

      bloodGroup: "BG",
      age: "Age",
      height: "height",
      weight: "Kg",

      currentMedication: [],
      medicalCondition: [],
      allergies: [],
      useTobacco: "No",
      useAlcohol: "No",
    });

    newMedicalHistoryData.save(async (error1, result1) => {
      if (!error1) {
        await Users.findOneAndUpdate(
          { _id: userId },
          { "profile.medicalHistoryId": result1._id }
        );
        // console.log("profile created");
        return { status: true, message: "success" };
      } else {
        console.log(error1.message);
        return { status: false, message: "Fail to create medical history" };
      }
    });
  } catch (err) {
    return { status: false, message: err.message };
  }
};

const userCtrl = {
  // Register a User
  register: async (req, res) => {
    try {
      const { name, username, mobile, email, password, role, gender } =
        req.body;

      if (!name || !email || !password || !mobile)
        return res.status(400).json({ msg: "Please fill in all fields." });

      let newUserName = username.toLowerCase().replace(/ /g, "");

      if (!validateEmail(email))
        return res.status(400).json({ msg: "Invalid emails." });

      if (!validPhone(mobile))
        return res.status(400).json({ msg: "Invalid phone number." });

      const user_email = await Users.findOne({ email });
      if (user_email)
        return res.status(400).json({ msg: "This email already exists." });

      const user_mobile = await Users.findOne({ mobile });
      if (user_mobile)
        return res.status(400).json({ msg: "This mobile already exists." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters." });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        name,
        username: newUserName,
        mobile,
        email,
        password: passwordHash,
        gender,
        role,
      };

      const activation_token = createActivationToken(newUser);

      const url = `${CLIENT_URL}/user/activate/${activation_token}`;
      
      sendMail(email, url, "Verify your email address");

      res.json({
        msg: "Register Success! Please activate your email to start.",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // Activation by Email
  activateEmail: async (req, res) => {
    try {
      const { activation_token } = req.body;
      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );

      const { name, username, mobile, email, password, gender, role } = user;

      const check = await Users.findOne({ email });
      if (check)
        return res.status(400).json({ msg: "This email already exists." });

      const newUser = new Users({
        name,
        username,
        mobile,
        email,
        password,
        gender,
        role,
      });

      newUser.save(async (error, result) => {
        if (!error) {
          const result1 = await createMedicalHistory(result._id);
          // if(result1.status===false)
          //   res.status(500).json({ msg: result1.message });
        } else {
          res.status(500).json({ msg: error.message });
        }
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // Login user
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "This email does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect." });

      const refresh_token = createRefreshToken({ id: user._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ msg: "Login success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // TOKEN
  getAccessToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: "Please login now!" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: "Please login now!" });
        // console.log(user);
        const access_token = createAccessToken({ id: user.id });
        res.json({ access_token });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // Forgot user Password
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await Users.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "This email does not exist." });

      const access_token = createAccessToken({ id: user._id });
      const url = `${CLIENT_URL}/user/reset/${access_token}`;

      sendMail(email, url, "Verify your email address");

      res.json({ msg: "Re-send the password, please check your email." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // Reset user Password
  resetPassword: async (req, res) => {
    try {
      const { password } = req.body;
      // console.log(password);
      const passwordHash = await bcrypt.hash(password, 12);

      // console.log(req.user)
      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          password: passwordHash,
        }
      );

      res.json({ msg: "Password successfully changed!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // Get single user
  getUserInfor: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");

      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // Get some public details of doctor's user profile
  fetchDoctorUser: async (req, res) => {
    try {
      const user = await Users.find({ _id: req.params.doctorId });
      const { avatar, email, mobile, gender } = user[0];
      res.json({ avatar, email, mobile, gender });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // Get some public details of user's user profile
  fetchUser: async (req, res) => {
    try {
      const user = await Users.find({ _id: req.params.userId });
      const { name, avatar, email, mobile, gender } = user[0];
      // console.log(req.body)
      res.json({ name, avatar, email, mobile, gender });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // Get all users(admin)
  getUsersAllInfor: async (req, res) => {
    try {
      // console.log(req.user)
      const users = await Users.find().select("-password");

      res.json(users);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // Logout user
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Logged out." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // update User Profile
  updateUser: async (req, res) => {
    try {
      const { name, avatar, mobile, address, gender } = req.body;
      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          name,
          avatar,
          mobile,
          address,
          gender,
        }
      );

      res.json({ msg: "Update Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // update User Role --Admin
  updateUsersRole: async (req, res) => {
    try {
      const { role } = req.body;

      await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          role,
        }
      );

      await Users.findOneAndUpdate(
        { _id: req.params.id },
        { "profile.medicalProfileId": "" }
      );
      await MedicalProfile.findOneAndDelete({ userId: req.params.id });

      if (role === 2) {
        const newMedicalProfileData = new MedicalProfile({
          userId: req.params.id,
          name: "Doctor's name",

          bloodGroup: "O+",
          age: "35",
          qualification: [],

          speciality_name: "Speciality",
          city_name: "Speciality",
          clinic_address: "Clinic address",
          experience_year: "Experience",
          caseRecord: [],
          blogRecord: [],
        });

        newMedicalProfileData.save(async (error1, result1) => {
          if (!error1) {
            await Users.findOneAndUpdate(
              { _id: req.params.id },
              { "profile.medicalProfileId": result1._id }
            );
          } else {
            console.log(error1.message);
            res.status(500).json({ msg: "failed to create medical profile" });
          }
        });
      }

      res.json({ msg: "Update Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // Delete User --Admin
  deleteUser: async (req, res) => {
    try {
      await Users.findByIdAndDelete(req.params.id);
      await MedicalProfile.findOneAndDelete({ userId: req.params.id });
      await MedicalHistory.findOneAndDelete({ userId: req.params.id });

      res.json({ msg: "Deleted Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  googleLogin: async (req, res) => {
    try {
      const { tokenId } = req.body;

      const verify = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.MAILING_SERVICE_CLIENT_ID,
      });

      // console.log(verify)
      const { email_verified, email, name, picture } = verify.payload;

      const password = email + process.env.GOOGLE_SECRET;

      const passwordHash = await bcrypt.hash(password, 12);

      if (!email_verified)
        return res.status(400).json({ msg: "Email verification failed." });

      const user = await Users.findOne({ email });

      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({ msg: "Password is incorrect." });

        const refresh_token = createRefreshToken({ id: user._id });
        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/user/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.json({ msg: "Login success!" });
      } else {
        const newUser = new Users({
          username: email.split("@")[0],
          name,
          email,
          mobile: "+911234567890",
          password: passwordHash,
          avatar: picture,
        });
        await newUser.save();

        const result = await createMedicalHistory(newUser._id);
        // if(result.status===false)
        //   res.status(500).json({ msg: result.message });

        const refresh_token = createRefreshToken({ id: newUser._id });
        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/user/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.json({ msg: "Login success!" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //get name and photo for conversation
  conInfo: async (req, res) => {
    const userId = req.params.id;
    // console.log(userId);
    try {
      const user = await Users.findById(userId);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  facebookLogin: async (req, res) => {
    try {
      const { accessToken, userID } = req.body;

      const URL = `https://graph.facebook.com/v2.9/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;

      const data = await fetch(URL)
        .then((res) => res.json())
        .then((res) => {
          return res;
        });

      const { email, name, picture } = data;

      const password = email + process.env.GOOGLE_SECRET;

      const passwordHash = await bcrypt.hash(password, 12);

      const user = await Users.findOne({ email });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({ msg: "Password is incorrect." });

        const refresh_token = createRefreshToken({ id: user._id });
        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/user/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.json({ msg: "Login success!" });
      } else {
        const newUser = new Users({
          username: email.split("@")[0],
          name,
          email,
          mobile: "+911234567890",
          password: passwordHash,
          avatar: picture.data.url,
        });

        await newUser.save();

        const result = await createMedicalHistory(newUser._id);
        // if(result.status===false)
        //   res.status(500).json({ msg: result.message });

        const refresh_token = createRefreshToken({ id: newUser._id });
        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/user/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.json({ msg: "Login success!" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

function validPhone(mobile) {
  const re = /^[+]/g;
  return re.test(mobile);
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = userCtrl;
