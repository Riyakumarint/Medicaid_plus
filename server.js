require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const conversationRoute = require("./routes/conversation");
const messageRoute = require("./routes/messages");
const slotRoute = require("./routes/slotRouter");
const router = express.Router();
const path = require("path");
const stripe = require("stripe")(process.env.STRIPE_KEY)
const uuid = require("uuid")

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Routes
app.use("/user", require("./routes/userRouter"));
app.use("/api", require("./routes/upload"));
app.use("/profiles", require("./routes/profilesRouter"));
app.use("/appointments", require("./routes/appointmentsRouter"));
app.use("/blogs", require("./routes/blogsRouter"));
app.use("/api", require("./routes/categoryRouter"));
app.use("/api", require("./routes/specialityRouter"));
app.use("/services", require("./routes/servicesRouter"));
app.use("/uploads", express.static("uploads"));
app.use("/conversations", conversationRoute);
app.use("/messages", messageRoute);
app.use("/slots", slotRoute);
app.use("/comment", require("./routes/commentsRouter"));



app.post("/", async (req, res) => {
  const { appointment, token } = req.body;
  const idempontencyKey = uuid()
  return stripe.patient.create({
      email: token.email,
      source:token.id
  }).then(patient => {
      stripe.charges.create({
          amount: appointment.fee * 100,
          currency: 'inr',
          patient: patient.id,
          patient_email: token.email,
          description: `{appointment.description}`
      },{idempontencyKey})
  })
      .then(result => res.status(200).json(result))
  .catch(err => console.log(err))
})

// Connect to mongodb
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to mongodb");
  }
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}


const PORT = process.env.PORT || 5013;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

/*npm i express mongoose cors dotenv bcrypt jsonwebtoken cookie-parser cloudinary concurrently express-fileupload googleapis node-fetch nodemailer next

npm i -D nodemon
*/

{
  /* 
npm i axios react-router-dom redux react-redux redux-thunk redux-devtools-extension moment bcrypt

*/
}
