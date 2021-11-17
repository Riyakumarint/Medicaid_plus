import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import SideNav from "../profile/sidenav/SideNav";
import {
  showSuccessMsg,
  showErrMsg,
} from "../../utils/notification/Notification";

function Speciality() {
  const [specialities, setSpecialities] = useState([]);
  const [callback, setCallback] = useState(false);
  const [speciality, setSpeciality] = useState("");
  const token = useSelector((state) => state.token);

  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState("");
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const getSpecialities = async () => {
      const res = await axios.get("/api/speciality");
      setSpecialities(res.data);
    };

    getSpecialities();
  }, [callback]);
  const createSpeciality = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `/api/speciality/${id}`,
          { name: speciality },
          {
            headers: { Authorization: token },
          }
        );
        setSuccess(res.data.msg);
      } else {
        const res = await axios.post(
          "/api/speciality",
          { name: speciality },
          {
            headers: { Authorization: token },
          }
        );
        setSuccess(res.data.msg);
      }
      setOnEdit(false);
      setSpeciality("");
      setCallback(!callback);
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  const editSpeciality = async (id, name) => {
    setID(id);
    setSpeciality(name);
    setOnEdit(true);
  };

  const deleteSpeciality = async (id) => {
    try {
      const res = await axios.delete(`/api/speciality/${id}`, {
        headers: { Authorization: token },
      });
      setSuccess(res.data.msg);
      setCallback(!callback);
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  return (
    <>
      <SideNav />
      <div className="categories">
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <div className="category_screen">
          <form onSubmit={createSpeciality}>
            <h4>Speciality</h4>
            <input
              type="text"
              name="speciality"
              value={speciality}
              required
              onChange={(e) => setSpeciality(e.target.value)}
            />

            <button className="category_button" type="submit">
              {onEdit ? "Update" : "Create"}
            </button>
          </form>

          <div className="line-2">
            <hr></hr>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="category_table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {specialities.map((speciality) => (
                  <tr key={speciality._id}>
                    <td>{speciality.name}</td>

                    <td>
                      <i
                        className="fas fa-edit"
                        title="Edit"
                        onClick={() =>
                          editSpeciality(speciality._id, speciality.name)
                        }
                      ></i>

                      <i
                        className="fas fa-trash-alt"
                        title="Remove"
                        onClick={() => deleteSpeciality(speciality._id)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Speciality;