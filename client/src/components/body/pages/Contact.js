import React from "react";
import emailjs from 'emailjs-com'
import SideNav from '../profile/sidenav/SideNav'
import ContactImg from "../../../images/contact.png";
function Contact() {
  function sendEmail(e) {
    e.preventDefault();
    emailjs.sendForm('service_wga88ue', 'template_csno9rb', e.target, "user_IGOQrTAhz43jpuzRTHuyc").then(res => {
      console.log(res)
    }).catch(err=>console.log(err))
  }
  return (
    <>
      <SideNav/>
      <div className="contact_container">
              <div className="container">
                  <div className="contact-page">
          <h1>Contact Us</h1>
              <form onSubmit={sendEmail}>
                <div class="col s12 m6 l4">
                  <div className="form-group">
                    <label>Name</label>
                    <input className="group" type="text" placeholder="Name" name="name" />
                  </div>
                </div>
                <div class="col s12 m6 l4">
                  <div className="form-group">
                    <label>Email</label>
                    <input  className="group" type="email" placeholder="Email" name="email" />
                  </div>
                </div>
                <div class="col s12 m6 l4">
                  <div className="form-group">
                    <label>Phone no.</label>
                    <input  className="group" type="text" placeholder="Email" name="phone" />
                  </div>
                </div>
                <div class="col s12 m6 l4">
                  <div className="form-group">
                    <label>Message</label>
                    <textarea
                      rows="5"
                      cols="30"
                      type="text"
                      className="contact_message"
                      id="exampleMessage"
                      placeholder="Message"
                      name="message"
                    ></textarea>
                  </div>
              </div>
              
              <div class="col s12 m6 l4">
                <input type="submit" value="Send" className="form-control send_btn"/>
                </div>
              </form></div>
            {/* </div> */}
            <div className="img-container">
                      <img className="contact-img" src={ContactImg} />
                      
            </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default Contact;
