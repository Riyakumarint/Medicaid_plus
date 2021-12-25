import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import SideNav from "../profile/sidenav/SideNav";
import {
  showSuccessMsg,
  showErrMsg,
} from "../../utils/notification/Notification";

function City() {
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState("");
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);
  const [callback, setCallback] = useState(false);

  const token = useSelector((state) => state.token);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const getCities = async () => {
      const res = await axios.get("/api/city");
      setCities(res.data);
    };
    getCities();
  }, [callback]);

  const createCity = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `/api/city/${id}`,
          {
            name: city,
          },
          {
            headers: { Authorization: token },
          }
        );
        setSuccess(res.data.msg);
      } else {
        const res = await axios.post(
          "/api/city",
          {
            name: city,
          },
          {
            headers: { Authorization: token },
          }
        );
        setSuccess(res.data.msg);
      }
      setOnEdit(false);
      setCity("");
      setCallback(!callback);
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  const editCity = async (id, name) => {
    setID(id);
    setCity(name);
    setOnEdit(true);
  };

  const deleteCity = async (id) => {
    try {
      const res = await axios.delete(`/api/city/${id}`, {
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
      <div className="specialities">
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <div className="speciality_screen">
          <form onSubmit={createCity}>
            <h4>City</h4>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
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
                {cities.map((city) => (
                  <tr key={city._id}>
                    <td>{city.name}</td>
                    <td>
                      <i
                        className="fas fa-edit"
                        title="Edit"
                        onClick={() => editCity(city._id, city.name)}
                      ></i>

                      <i
                        className="fas fa-trash-alt"
                        title="Remove"
                        onClick={() => deleteCity(city._id)}
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

export default City;
