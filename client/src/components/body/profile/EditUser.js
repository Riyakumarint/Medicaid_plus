import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import SideNav from "./sidenav/SideNav";
import {
  showSuccessMsg,
  showErrMsg,
} from "../../utils/notification/Notification";

function EditUser() {
  const { id } = useParams();
  const history = useHistory();
  const [editUser, setEditUser] = useState([]);

  const users = useSelector((state) => state.users);
  const token = useSelector((state) => state.token);

  const [checkAdmin, setCheckAdmin] = useState(false);
  const [role, setRole] = useState("0");
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (users.length !== 0) {
      users.forEach((user) => {
        if (user._id === id) {
          setEditUser(user);
          setRole(user.role);
        }
      });
    } else {
      history.push("/profile");
    }
  }, [users, id, history]);

  const handleUpdate = async () => {
    try {
      const res = await axios.patch(
        `/user/update_role/${editUser._id}`,
        {
          role,
        },
        {
          headers: { Authorization: token },
        }
      );

      setSuccess(res.data.msg);
      setTimeout(() => {
        history.push("/dash_board");
      }, 1500);
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    if (value === "0" || value === "1" || value === "2") {
      setRole(Number(value));
    }
  };

  return (
    <>
      <SideNav />
      <div className="continer-profile">
        <div className="edit_pro">
          <div className="profile_page edit_user">
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            {/* <button onClick={() => history.goBack()} className="go_back">
            <i className="fas fa-long-arrow-alt-left"></i> Go Back
          </button> */}
            <div className="profile_header">
              <h4>Edit User</h4>
            </div>
            <div className="profile-container">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editUser.name}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={editUser.email}
                  disabled
                />
              </div>
              <div className="row">
                <div className="form-group mycheck">
                  <label htmlFor="role">Role</label>
                  <input
                    className="role"
                    id="role"
                    placeholder="role"
                    onChange={handleChangeInput}
                    defaultValue={editUser.role}
                    name="role"
                  />
                </div>
              </div>
              <div className="edit_btn">
                <button onClick={handleUpdate}>Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditUser;
