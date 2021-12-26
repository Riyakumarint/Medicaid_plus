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

const LabTest = () => {
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState({ city_name: "" });
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState({
    doctortId: "",
    doctor_name: "",
    clinic_address: "",
  });
  const [labTests, setLabTests] = useState([]);
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
          "/services/labTest",
          { medicalId: "", patientID: user._id },
          { headers: { Authorization: token } }
        );
        setLabTests(res.data);
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
  const handleDeleteLabTest = async (labTestId) => {
    try {
      await axios.delete("/services/labTest/" + labTestId, {
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
                <th>Enter Test</th>
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
                    <Link to={`/book_lab_test/${doctor.userId}`}>
                      <i className="fas fa-vial" title="Add">
                        
                        Book Test
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

  const renderLabTests = () => {
    if (labTests.length === 0) return "No lab test bookings";
    return (
      <div className="col-right">
        <div style={{ overflowX: "auto" }}>
          <table className="medical">
            <thead>
              <tr>
                <th>Name</th>
                <th>Test</th>
                <th>Address</th>
                <th>Mobile</th>
                <th>Status</th>
                <th>Cancle</th>
              </tr>
            </thead>
            <tbody>
              {labTests.map((labTest) => (
                <tr key={labTest._id}>
                  <td>{labTest.name}</td>
                  <td>{labTest.testName}</td>
                  <td>{labTest.address}</td>
                  <td>{labTest.mobile}</td>
                  <td>{labTest.status}</td>
                  <td>
                    <i
                      className="fas fa-trash-alt"
                      title="Add"
                      onClick={() => handleDeleteLabTest(labTest._id)}
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
              <h4>Book Your Lab Test</h4>
            </div>

            <div className="profile-container">
              <div>
                <h5>Bookings</h5>
                {renderLabTests()}
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
export default LabTest;
