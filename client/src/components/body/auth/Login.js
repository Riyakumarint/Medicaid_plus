import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import { dispatchLogin } from "../../../redux/actions/authAction";
import { useDispatch } from "react-redux";
import googleIcon from "../../../images/google.png";
import facebookIcon from "../../../images/facebook.png";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import Loading from "../../utils/notification/LoadingAdmin";
const initialState = {
  email: "",
  password: "",
  err: "",
  success: "",
};

function Login() {
  const [user, setUser] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();
  const [typePass, setTypePass] = useState(false);
  const [loading, setLoading] = useState(true);

  const { email, password, err, success } = user;

  const GOOGLE_CLIENTID =
    "836200288089-9rlk2tq35ushljhs1fn1isi3sdvucpfe.apps.googleusercontent.com";
  const FACEBOOK_APPID = "1049446772568446";
  // console.log(process.env.FACEBOOK_APPID)

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/login", { email, password });

      setUser({ ...user, err: "", success: res.data.msg });

      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      history.push("/");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
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
    // console.log(response);
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

  useEffect(() => {
    // Loading function to load data or
    // fake it using setTimeout;
    const loadData = async () => {
      // Wait for two second
      await new Promise((r) => setTimeout(r, 700));

      // Toggle loading state
      setLoading((loading) => !loading);
    };

    loadData();
  }, []);
  if (loading) {
    return (
      <>
        <div
          className="loading"
          style={{ background: "#f8bec1", height: "100vh" }}
        >
          <Loading />
        </div>
      </>
    );
  } else {
    return (
      <div className="container_sign">
        <div className="forms-container">
          <div className="signin-signup">
            <form onSubmit={handleSubmit}>
              <h3 className="title">Sign in</h3>
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
              <div className="form-group">
                <div className="input-field">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                  <input
                    type={typePass ? "text" : "password"}
                    className="password"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    onChange={handleChangeInput}
                    value={password}
                    name="password"
                  />
                  <small
                    className="hide"
                    onClick={() => setTypePass(!typePass)}
                  >
                    {typePass ? (
                      <i class="fa fa-eye-slash" aria-hidden="true"></i>
                    ) : (
                      <i class="fa fa-eye" aria-hidden="true"></i>
                    )}
                  </small>
                </div>
              </div>
              <button
                type="submit"
                className="button"
                disabled={email && password ? false : true}
                onClick={() => window.scrollTo({ top: 0 })}
              >
                Login
              </button>

              <p className="social-text">Or sign in with social platforms</p>
              <div className="social">
                <GoogleLogin
                  clientId={GOOGLE_CLIENTID}
                  buttonText="Login with google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />

                <FacebookLogin
                  appId={FACEBOOK_APPID}
                  autoLoad={false}
                  fields="name,email,picture"
                  onClick={componentClicked}
                  callback={responseFacebook}
                />
              </div>

              <Link
                className="my-2"
                style={{
                  color: "#538bfa",
                }}
                to="forgot_password"
                onClick={() => window.scrollTo({ top: 0 })}
              >
                Forgot your password?
              </Link>

              <p className="my-2">
                You don't have an account?{" "}
                <Link
                  to="/register"
                  style={{ color: "crimson" }}
                  onClick={() => window.scrollTo({ top: 0 })}
                >
                  Register Now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
