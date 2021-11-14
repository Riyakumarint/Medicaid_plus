import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import Success from "../../../images/target.png";
import Home from "../../../images/home.png";

function ActivationEmail() {
  const { activation_token } = useParams();
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post("/user/activation", {
            activation_token,
          });
          setSuccess(res.data.msg);
        } catch (err) {
          err.response.data.msg && setErr(err.response.data.msg);
        }
      };
      activationEmail();
    }
  }, [activation_token]);
  
  return (<>
   
    <div className="active_page">
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
      
      <div className="container_active">
      
            <div className="verify">
              
            <form className="thanks">
              <div className="thanksheader">Thank you</div>
              <div className="up">
                <img src={Success} className="success_up" alt="thanks" />
                <h4>Registration Successful</h4>
              </div>
              <div className="down">
                <h2>Congratulation, your account </h2>
                <h2>has been successfully created.</h2>
                <a href="/" type="submit" className="button">
                  <img src={Home} className="home" alt="home" />
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
     
    </>
  );
}

export default ActivationEmail;
