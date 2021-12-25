const nodemailer = require("nodemailer");

const sendEmail = (email, url, txt) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // user: "studyearthuniverse@gmail.com",
      // pass: "Y}t{w<5wcHZ=",
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: "noreply@gmail.com",
    to: email,
    subject: "Medicaid+: Account Activation Link",
    html: `
    <div style="margin:0;padding:0;font-family:sans-serif;background-color: #F7F7F7;text-align: center; ">

    <div style="max-width: 500px; margin: auto;border-top: 60px solid #F7F7F7; padding: 50px 40px; font-size: 110%; background-color:white;color: #5D5C5C;">
    

    <h2 style="font-family: comic sans ms,sans-serif; font-size: 35px;color:crimson;"><strong>Welcome to Medicaid+</strong></h2>

    <hr>

    <p style="font-size: 20px;"> Hi ,</p>
    
    <p style="font-size: 20px;">You're almost set to start using Medicaid+.
    Just click the button below to validate your email address.
    </p>
    
    <a href=${url} style="background: crimson; text-align: center; width:auto ; border-radius: 20px; cursor:pointer;text-decoration: none; color: white; padding: 12px 25px; margin: 15px ; display: inline-block;">
    ${txt}
    </a>
    <p style="font-size: 14px;">
    Note: You must perform this validation within the next 24 hours to keep your new account enabled.
    </p>
    
</div>
<div style="max-width: 500px; margin: auto;border-down-style: 60px solid #F7F7F7; padding: 50px 40px; font-size: 110%; background-color:crimson;color: white;font-size: 14px; font-family: Verdana, Arial, Helvetica, sans-serif;">

<h2 style="text-align: center;font-weight: bold;font-size: 35px; font-family: fantasy;color: white;"> Here's What Happens Next: </h2>

<ul style="text-align: left;">
<li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
<li>It is a long established fact that a reader will be distracted </li>
<li>The point of using Lorem Ipsum is that it has a more-or-less normal distribution.</li>
</ul>  

    </div>
    <div style="max-width: 500px; margin: auto;  padding: 50px 40px; font-size: 80%; background-color:white;color: grey;">

    <p>MNNIT Allahabad Campus</p>
    <p>Teliarganj, Prayagraj, Uttar Pradesh 211004
    </p>
    <p>© 2021 Medicaid+. All Rights Reserved.</p>
    </div>
    </div>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendEmail;
