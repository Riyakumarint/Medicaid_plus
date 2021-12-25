import React from "react";
import emailjs from "emailjs-com";
import { useHistory } from "react-router-dom";
import SideNav from "../profile/sidenav/SideNav";
import ContactImg from "../../../images/contact.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Contact() {
  const history = useHistory();

  function sendEmail(e) {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_wga88ue",
        "template_csno9rb",
        e.target,
        "user_IGOQrTAhz43jpuzRTHuyc"
      )
      .then((res) => {
        // console.log(res);
        toast("Message Send", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          history.push("/");
        }, 3000);
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <SideNav />
      <div className="contact_container">
        <div className="container">
          <div className="contact-page">
            <h1>Contact Us</h1>
            <form onSubmit={sendEmail}>
              <div class="col s12 m6 l4">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    className="group"
                    type="text"
                    placeholder="Name"
                    name="name"
                  />
                </div>
              </div>
              <div class="col s12 m6 l4">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    className="group"
                    type="email"
                    placeholder="Email"
                    name="email"
                  />
                </div>
              </div>
              <div class="col s12 m6 l4">
                <div className="form-group">
                  <label>Phone no.</label>
                  <input
                    className="group"
                    type="text"
                    placeholder="Email"
                    name="phone"
                  />
                </div>
              </div>
              {/* <a
  href="https://timesofindia.indiatimes.com/thumb/msid-70238371,imgsize-89579,width-400,resizemode-4/70238371.jpg"
  download
 >
   <i className="fa fa-download" />
 </a> */}
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
                <input
                  type="submit"
                  value="Send"
                  className="form-control send_btn"
                />
              </div>
            </form>
          </div>
          {/* </div> */}
          <div className="img-container">
            <img className="contact-img" src={ContactImg} />
          </div>

          {/* </div> */}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Contact;
