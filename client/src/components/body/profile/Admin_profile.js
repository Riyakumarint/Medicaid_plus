import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchAllUsers,
  dispatchGetAllUsers,
} from "../../../redux/actions/usersAction";

const initialState = {
  name: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

function Admin_profile() {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);

  const users = useSelector((state) => state.users);

  const { user, isAdmin, isDoctor } = auth;
  const [data, setData] = useState(initialState);

  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0 });
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

  const handleDelete = async (id) => {
    try {
      if (user._id !== id) {
        if (window.confirm("Are you sure you want to delete this account?")) {
          setLoading(true);
          await axios.delete(`/user/delete/${id}`, {
            headers: { Authorization: token },
          });
          setLoading(false);
          setCallback(!callback);
        }
      }
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div className="profile_page">
      <div className="col-right">
        <h2>Users</h2>
        <div style={{ overflowX: "auto" }}>
          <table className="customers">
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  {/* <td>{user._id}</td> */}
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === 1 ? (
                      <i class="fa fa-user-plus" title="Admin"></i>
                    ) : user.role === 2 ? (
                      <i class="fa fa-user-md" title="Doctor"></i>
                    ) : (
                      <i class="fa fa-user" title="User"></i>
                    )}
                  </td>
                  <td>
                    <Link to={`/edit_user/${user._id}`}>
                      <i className="fas fa-edit" title="Edit"></i>
                    </Link>
                    <i
                      className="fas fa-trash-alt"
                      title="Remove"
                      onClick={() => handleDelete(user._id)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin_profile;
