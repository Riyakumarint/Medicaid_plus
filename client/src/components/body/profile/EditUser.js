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
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);
  const [num, setNum] = useState(0);

  useEffect(() => {
    if (users.length !== 0) {
      users.forEach((user) => {
        if (user._id === id) {
          setEditUser(user);
          setCheckAdmin(user.role === 1 ? true : false);
        }
      });
    } else {
      history.push("/profile");
    }
  }, [users, id, history]);

  const handleUpdate = async () => {
    try {
      if (num % 2 !== 0) {
        const res = await axios.patch(
          `/user/update_role/${editUser._id}`,
          {
            role: checkAdmin ? 1 : 0,
          },
          {
            headers: { Authorization: token },
          }
        );

        setSuccess(res.data.msg);
        setNum(0);
      }
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  const handleCheck = () => {
    setSuccess("");
    setErr("");
    setCheckAdmin(!checkAdmin);
    setNum(num + 1);
  };

  return (<>
    <SideNav/>
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
                <label htmlFor="isAdmin">isAdmin</label>
                <input
                  type="checkbox"
                  class="mycheck"
                  id="isAdmin"
                  checked={checkAdmin}
                  onChange={handleCheck}
                />
              </div>
                      </div>
                    <div className="edit_btn">
            <button onClick={handleUpdate}>Update</button></div>

           
          </div>
        </div>
      </div>
    </div></>
  );
}

export default EditUser;
