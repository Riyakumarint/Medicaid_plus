import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { isLength, isMatch } from "../../utils/validation/Validation";
import Loading from "../../utils/notification/Loading";
import {
  showSuccessMsg,
  showErrMsg,
} from "../../utils/notification/Notification";
import {
  fetchAllUsers,
  dispatchGetAllUsers,
} from "../../../redux/actions/usersAction";
import SideNav from "./sidenav/SideNav";

const initialState = {
  name: "",
  password: "",
  cf_password: "",
  mobile: "",
  address: "",
  gender: "",
  err: "",
  success: "",
};

function Profile() {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const { user, isAdmin, isDoctor } = auth;
  const [data, setData] = useState(initialState);
  const { name, password, cf_password, mobile, address, gender, err, success } =
    data;

  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAdmin) {
      fetchAllUsers(token).then((res) => {
        dispatch(dispatchGetAllUsers(res));
      });
    }
  }, [token, isAdmin, dispatch, callback]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file)
        return setData({
          ...data,
          err: "No files were uploaded.",
          success: "",
        });

      if (file.size > 1024 * 1024)
        return setData({ ...data, err: "Size too large.", success: "" });

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return setData({
          ...data,
          err: "File format is incorrect.",
          success: "",
        });

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload_avatar", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });

      setLoading(false);
      setAvatar(res.data.url);
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const updateInfor = () => {
    try {
      axios.patch(
        "/user/update",
        {
          name: name ? name : user.name,
          avatar: avatar ? avatar : user.avatar,
          mobile: mobile ? mobile : user.mbile,
          address: address ? address : user.address,
          gender: gender ? gender : user.gender,
        },
        {
          headers: { Authorization: token },
        }
      );

      setData({ ...data, err: "", success: "Updated Success!" });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const updatePassword = () => {
    if (isLength(password))
      return setData({
        ...data,
        err: "Password must be at least 6 characters.",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setData({ ...data, err: "Password did not match.", success: "" });

    try {
      axios.post(
        "/user/reset",
        { password },
        {
          headers: { Authorization: token },
        }
      );

      setData({ ...data, err: "", success: "Updated Success!" });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const handleUpdate = () => {
    if (name || avatar || mobile || address || gender) updateInfor();
    if (password) updatePassword();
  };

  return (
    <>
      <SideNav />
      <div className="continer-profile">
        <div className="pro">
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}
          {loading && <Loading />}

          <div className="profile_page">
            <div className="profile_header">
              <h4>{isAdmin ? "Admin" : isDoctor ? "Doctor" : "User"}</h4>

              <button disabled={loading} onClick={handleUpdate}>
                Update
              </button>
            </div>
            <div className="profile-container">
              <div className="row">
                <div class="col s12 m6 l4">
                  <label htmlFor="name">Profile photo</label>
                  <div className="avatar_box">
                    <div className="avatar">
                      <img src={avatar ? avatar : user.avatar} alt="" />
                      <span>
                        <i className="fas fa-camera"></i>
                        <p>Change</p>
                        <input
                          type="file"
                          name="file"
                          id="file_up"
                          onChange={changeAvatar}
                        />
                      </span>
                    </div>
                    <div className="p_a">
                      <p>Change profile </p>
                      <p>photo</p>
                    </div>
                  </div>
                </div>
                <div class="col s12 m6 l4">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      defaultValue={user.name}
                      placeholder="Your name"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="line-2">
                <hr></hr>
              </div>
              <div className="row">
                <div class="col s12 m6 l4">
                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <input
                      type="gender"
                      name="gender"
                      id="gender"
                      defaultValue={user.gender}
                      placeholder="Gender"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div class="col s12 m6 l4">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      defaultValue={user.email}
                      placeholder="Your email address"
                      disabled
                    />
                  </div>
                </div>
                <div class="col s12 m6 l4">
                  <div className="form-group">
                    <label htmlFor="mobile">Mobile Number</label>
                    <input
                      type="tel"
                      name="mobile"
                      id="phone"
                      defaultValue={user.mobile}
                      placeholder="Mobile Number"
                      onChange={handleChange}
                      autocomplete="off"
                    />
                  </div>
                </div>
              </div>
              <div className="line-2">
                <hr></hr>
              </div>
              <div className="row">
                <div class="col s12 m6 l4">
                  <div className="form-group">
                    <label htmlFor="name">Address</label>
                    <textarea
                      rows="3"
                      cols="30"
                      type="text"
                      className="appointment_description"
                      id="exampleAddress"
                      aria-describedby="address"
                      placeholder="Address"
                      onChange={handleChange}
                      name="address"
                      defaultValue={user.address}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="line-2">
                <hr></hr>
              </div>
              <div className="row">
                <div class="col s12 m6 l4">
                  <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Your password"
                      value={password}
                      onChange={handleChange}
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div class="col s12 m6 l4">
                  <div className="form-group">
                    <label htmlFor="cf_password">Confirm New Password</label>
                    <input
                      type="password"
                      name="cf_password"
                      id="cf_password"
                      placeholder="Confirm password"
                      value={cf_password}
                      onChange={handleChange}
                      autocomplete="off"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="line-2">
            <hr></hr>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
