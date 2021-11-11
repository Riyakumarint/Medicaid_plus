import React, { useState } from "react";
import axios from "axios";
import { isEmail } from "../../utils/validation/Validation";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";

const initialState = {
  email: "",
  err: "",
  success: "",
};

function ForgotPassword() {
  const [data, setData] = useState(initialState);

  const { email, err, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const forgotPassword = async () => {
    if (!isEmail(email))
      return setData({ ...data, err: "Invalid emails.", success: "" });

    try {
      const res = await axios.post("/user/forgot", { email });

      return setData({ ...data, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div className="container_sign">
      <div className="forms-container" >
        <div className="signin-signup">
          <form>
            <h3 className="title">Forgot Password?</h3>

            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <div className="form-group">
              <div className="input-field">
                <i className="fa fa-envelope" aria-hidden="true"></i>

                <input
                  type="email"
                  className="email"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Email"
                  onChange={handleChangeInput}
                  name="email"
                  value={email}
                />
              </div>
            </div>

            <button
              type="submit"
              className="button"
              onClick={forgotPassword}
              disabled={email ? false : true}
            >
              Verify email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
