import React, { useState } from "react";
import { Link, useHistory} from "react-router-dom";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import {
  isEmpty,
  isPhone,
  isEmail,
  isLength,
  isMatch,
} from "../../utils/validation/Validation";
import { dispatchLogin } from "../../../redux/actions/authAction";
import { useDispatch } from "react-redux";
import googleIcon from "../../../images/google.png";
import facebookIcon from "../../../images/facebook.png";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from 'react-facebook-login';


const initialState = {
  name: "",
  username: "",
  mobile: "",
  email: "",
  password: "",
  cf_password: "",
  gender: "male",
  err: "",
  success: "",
};

function Register() {
  const [user, setUser] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  const { name, username, mobile, email, password, cf_password, gender, err, success } =
    user;
  
    const GOOGLE_CLIENTID = "836200288089-9rlk2tq35ushljhs1fn1isi3sdvucpfe.apps.googleusercontent.com";
  const FACEBOOK_APPID = "1049446772568446";
  
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const responseGoogle = async (response) => {
    // console.log(response);
    try {
      const res = await axios.post("/user/google_login", {
        tokenId: response.tokenId,
      });

      setUser({ ...user, error: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      history.push("/");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  const responseFacebook = async (response) => {
    console.log(response);
    try {
      const { accessToken, userID } = response;
      const res = await axios.post("/user/facebook_login", {
        accessToken,
        userID,
      });

      setUser({ ...user, error: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      history.push("/");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  const componentClicked = () => console.log("logging in to facebook");


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      isEmpty(name) ||
      isEmpty(username) ||
      isEmpty(mobile) ||
      isEmpty(email) ||
      isEmpty(password)
    )
      return setUser({
        ...user,
        err: "Please fill in all fields.",
        success: "",
      });

    if (!isEmail(email))
      return setUser({ ...user, err: "Invalid emails.", success: "" });

    if (!isPhone(mobile))
      return setUser({ ...user, err: "Invalid phone number.", success: "" });

    if (isLength(password))
      return setUser({
        ...user,
        err: "Password must be at least 6 characters.",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setUser({ ...user, err: "Password did not match.", success: "" });

    try {
      const res = await axios.post("/user/register", {
        name,
        username,
        mobile,
        email,
        password,
        gender,
      });

      setUser({ ...user, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div className="container_sign">
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleSubmit}>
            <h3 className="title">Sign up</h3>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            <div className="form-group">
              <div className="input-field">
                <i class="fa fa-id-card-o" aria-hidden="true"></i>

                <input
                  type="text"
                  className="name"
                  id="name"
                  name="name"
                  placeholder="Fullname"
                  onChange={handleChangeInput}
                  value={name}
                  
                />

                
              </div>
            </div>

            <div className="form-group">
              <div className="input-field">
                <i class="fa fa-user" aria-hidden="true"></i>

                <input
                  type="text"
                  className="username"
                  id="username"
                  name="username"
                  placeholder="Username"
                  onChange={handleChangeInput}
                  value={username.toLowerCase().replace(/ /g, "")}
                />

              </div>
            </div>

            <div className="form-group">
              <div className="input-field">
                <i class="fa fa-phone" aria-hidden="true"></i>

                <input
                  type="mobile"
                  className="email"
                  id="exampleInputmobile"
                  name="mobile"
                  placeholder="Phone number"
                  onChange={handleChangeInput}
                  value={mobile}
                />

              
              </div>
            </div>

            <div className="form-group">
              <div className="input-field">
                <i class="fa fa-envelope" aria-hidden="true"></i>

                <input
                  type="email"
                  className="email"
                  id="exampleInputEmail1"
                  name="email"
                  placeholder="Email"
                  onChange={handleChangeInput}
                  value={email}
                />

              </div>
            </div>

            <div className="form-group">
              <div className="input-field">
                <i class="fa fa-lock" aria-hidden="true"></i>
                <input
                  type={typePass ? "text" : "password"}
                  className="password"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={handleChangeInput}
                  value={password}
                  name="password"
                />

                <small className="hide" onClick={() => setTypePass(!typePass)}>
                  {typePass ? <i class="fa fa-eye-slash" aria-hidden="true"></i> : <i class="fa fa-eye" aria-hidden="true"></i>}
                </small>
             
              </div>
            </div>

            <div className="form-group">
              <div className="input-field">
                <i class="fa fa-key" aria-hidden="true"></i>
                <input
                  type={typeCfPass ? "text" : "password"}
                  className="cf_password"
                  id="cf_password"
                  placeholder="Confirm Password"
                  onChange={handleChangeInput}
                  value={cf_password}
                  name="cf_password"
                />

                <small
                  className="hide"
                  onClick={() => setTypeCfPass(!typeCfPass)}
                >
                  {typeCfPass ? <i class="fa fa-eye-slash" aria-hidden="true"></i> : <i class="fa fa-eye" aria-hidden="true"></i>}
                </small>

              </div>
            </div>

            <div className="gender">
              <label htmlFor="male" className="gender">
                Male:{" "}
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  defaultChecked
                  onChange={handleChangeInput}
                />
              </label>

              <label htmlFor="female" className="gender">
                Female:{" "}
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  onChange={handleChangeInput}
                />
              </label>

              <label htmlFor="other" className="gender">
                Other:{" "}
                <input
                  type="radio"
                  id="other"
                  name="gender"
                  value="other"
                  onChange={handleChangeInput}
                />
              </label>
            </div>

            <button type="submit" className="button" onClick={() => window.scrollTo({ top: 0 })}>
              Register
            </button>


            <p className="social-text">Or sign up with social platforms</p>
            <div className="social">
              <GoogleLogin
                clientId = {GOOGLE_CLIENTID}
                buttonText = "Signup with google"
                onSuccess = {responseGoogle}
                onFailure = {responseGoogle}
                cookiePolicy = {'single_host_origin'}
              />
            
              <FacebookLogin
                appId={FACEBOOK_APPID}
                autoLoad={false}
                fields="name,email,picture"
                onClick={componentClicked}
                callback={responseFacebook} 
              />
            </div>
            <p className="my-2">
              Already have an account?
              <Link to="/login" style={{ color: "crimson",padding:"7px" }} onClick={() => window.scrollTo({ top: 0 })}>
                Login Now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>

    // <div className="login_page">
    //   <h2>Register</h2>
    //   {err && showErrMsg(err)}
    //   {success && showSuccessMsg(success)}

    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label htmlFor="name">Name</label>
    //       <input
    //         type="text"
    //         placeholder="Enter your name"
    //         id="name"
    //         value={name}
    //         name="name"
    //         onChange={handleChangeInput}
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="username">User Name</label>
    //       <input
    //         type="text"
    //         placeholder="Enter user name"
    //         id="username"
    //         value={username}
    //         name="username"
    //         onChange={handleChangeInput}
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="mobile">Phone Number</label>
    //       <input
    //         type="text"
    //         placeholder="Phone Number"
    //         id="mobile"
    //         value={mobile}
    //         name="mobile"
    //         onChange={handleChangeInput}
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="email">Email Address</label>
    //       <input
    //         type="text"
    //         placeholder="Enter email address"
    //         id="email"
    //         value={email}
    //         name="email"
    //         onChange={handleChangeInput}
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="password">Password</label>
    //       <input
    //         type="password"
    //         placeholder="Enter password"
    //         id="password"
    //         value={password}
    //         name="password"
    //         onChange={handleChangeInput}
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="cf_password">Confirm Password</label>
    //       <input
    //         type="password"
    //         placeholder="Confirm password"
    //         id="cf_password"
    //         value={cf_password}
    //         name="cf_password"
    //         onChange={handleChangeInput}
    //       />
    //     </div>

    //     <div className="row">
    //       <button type="submit">Register</button>
    //     </div>
    //   </form>

    //   <p>
    //     Already an account? <Link to="/login">Login</Link>
    //   </p>
    // </div>
  );
}

export default Register;
