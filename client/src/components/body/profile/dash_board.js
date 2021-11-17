import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { isLength, isMatch } from "../../utils/validation/Validation";
import Loading from "../../utils/notification/Loading";
import AdminProfile from "./Admin_profile";
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
  err: "",
  success: "",
};

function Dash_board() {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);

  const users = useSelector((state) => state.users);

  const { user, isAdmin } = auth;
  const [data, setData] = useState(initialState);
  const { name, password, cf_password, err, success } = data;

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
              <h4>{user.name}</h4>
            </div>
            <div className="profile-container">
              <div className="row">
                <div class="col s12 m6 l4">
                  <div className="avatar">
                    <img src={avatar ? avatar : user.avatar} alt="" />
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="line-2">
            <hr></hr>
          </div>
          <div className="col-right">
            <div>{isAdmin ? <AdminProfile /> : "My Orders"}</div>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default Dash_board;
