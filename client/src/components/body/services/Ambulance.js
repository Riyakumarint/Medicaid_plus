import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactStars from "react-stars";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import SideNav from "../profile/sidenav/SideNav";

const Ambulance = () => {
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState({ city_name: "" });
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState({
    doctortId: "",
    doctor_name: "",
    clinic_address: "",
  });
  const [ambulances, setAmbulances] = useState([]);
  const [statuss, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);

  const history = useHistory();

  const token = useSelector((state) => state.token);
  const { user } = useSelector((state) => state.auth);

  // data fetching
  useEffect(() => {
    window.scrollTo({ top: 0 });
    const getLabTests = async () => {
      try {
        const res = await axios.put(
          "/services/ambulance",
          { medicalId: "", patientID: user._id },
          { headers: { Authorization: token } }
        );
        setAmbulances(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getLabTests();
  }, [callback, user, token]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const getCities = async () => {
      const res = await axios.get("/api/city");
      setCities(res.data);
    };
    getCities();
  }, [callback, user]);

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const res = await axios.post("/api/fetchDoctors/", {
          speciality_name: "",
          city_name: "",
        });
        setDoctors(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getDoctors();
  }, [callback, user]);

  // handle changes
  const handleChangeCity = async (e) => {
    const { name, value } = e.target;
    setCity({ ...city, [name]: value });
    setDoctor({
      ...doctor,
      doctortId: "",
      doctor_name: "",
      clinic_address: "",
    });
    try {
      const res = await axios.post("/api/fetchDoctors/", {
        speciality_name: "",
        city_name: e.target.value,
      });
      setDoctors(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // handle submit
  const handleDeleteAmbulance = async (ambulanceId) => {
    try {
      await axios.delete("/services/ambulance/" + ambulanceId, {
        headers: { Authorization: token },
      });
      setStatus("");
      setCallback(!callback);
    } catch (err) {
      console.log(err);
    }
  };

  // renders
  const renderDoctors = (doctors) => {
    if (doctors.length === 0) return "No Center Avilable";
    return (
      <div className="col-right">
        <div style={{ overflowX: "auto" }}>
          <table className="medical">
            <thead>
              <tr>
                <th>Facility Name</th>
                <th>City</th>
                <th>Rating</th>
                <th>Book Ambulance</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor._id}>
                  <td>{doctor.clinic_address}</td>
                  <td>{getCityName(doctor.city_name, cities)}</td>
                  <td>
                    <ReactStars
                      count={5}
                      value={Number(doctor.reviews.rating)}
                      size={24}
                      color2={"#ffd700"}
                      edit={false}
                    />
                  </td>
                  <td>
                    <Link to={`/book_ambulance/${doctor.userId}`}>
                      <i className="fas fa-ambulance" title="Add">
                        {" "}
                        Call
                      </i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderAmbulances = () => {
    if (ambulances.length === 0) return "No ambulance bookings";
    return (
      <div className="col-right">
        <div style={{ overflowX: "auto" }}>
          <table className="medical">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Mobile</th>
                <th>Status</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {ambulances.map((ambulance) => (
                <tr key={ambulance._id}>
                  <td>{ambulance.name}</td>
                  <td>{ambulance.address}</td>
                  <td>{ambulance.mobile}</td>
                  <td>{ambulance.status}</td>
                  <td>
                    <i
                      className="fas fa-trash-alt"
                      title="Add"
                      onClick={() => handleDeleteAmbulance(ambulance._id)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <>
      <SideNav />
      <div className="continer-profile">
        <div className="pro">
          <div className="profile_page">
            <div className="profile_header">
              <h4>Book Ambulance</h4>
            </div>

            <div className="profile-container">
              <div>
                <h5>Bookings</h5>
                {renderAmbulances()}
              </div>
              <hr></hr>
              <br></br>

              {/* Selectdoctor block */}
              <div className="row">
                <div class="col s12 m6 l4">
                  <div className="form-group">
                    <label htmlFor="city_name">
                      <h5>Select a City</h5>
                    </label>
                    <select
                      className="form-control text-capitalize speciality_name"
                      value={city.city_name}
                      name="city_name"
                      onChange={handleChangeCity}
                    >
                      <option value="">Choose a city</option>
                      {cities.map((city) => (
                        <option key={city._id} value={city._id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h5>Centers</h5>
                {renderDoctors(doctors)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Lenght = (symptoms) => symptoms.length;

const getCityName = (_id, cities) => {
  const spec = cities.filter((city) => {
    return city._id === _id;
  });
  if (Lenght(spec) === 0) return "";
  return spec[0].name;
};
export default Ambulance;
