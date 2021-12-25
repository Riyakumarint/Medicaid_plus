import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import SideNav from "../profile/sidenav/SideNav";
import Loading from "../../utils/notification/Loading";

const Services = () => {
  const [labTests, setLabTests] = useState([]);
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
        const res1 = await axios.put(
          "/services/labTest",
          { medicalId: user._id, patientID: "" },
          { headers: { Authorization: token } }
        );
        setLabTests(res1.data);

        const res2 = await axios.put(
          "/services/ambulance",
          { medicalId: user._id, patientID: "" },
          { headers: { Authorization: token } }
        );
        setAmbulances(res2.data);
      } catch (err) {
        console.log(err);
      }
    };
    getLabTests();
  }, [callback, token, user]);

  // handle changes
  const handleChangeStatus = (e) => {
    const { name, value } = e.target;
    setStatus(value);
  };

  // handle submit
  const handleUpdateLabTest = async (labTest) => {
    try {
      const newLabTest = { ...labTest, status: statuss };
      await axios.put("/services/labTest/" + labTest._id, newLabTest, {
        headers: { Authorization: token },
      });
      setStatus("");
      setCallback(!callback);
    } catch (err) {
      console.log(err);
    }
  };
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

  const handleUpdateAmbulance = async (ambulance) => {
    try {
      const newAmbulance = { ...ambulance, status: statuss };
      await axios.put("/services/ambulance/" + ambulance._id, newAmbulance, {
        headers: { Authorization: token },
      });
      setStatus("");
      setCallback(!callback);
    } catch (err) {
      console.log(err);
    }
  };
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
                <th>Update</th>
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
                    <input
                      className="status"
                      id="exampleInputstatus1"
                      placeholder="status"
                      onChange={handleChangeStatus}
                      name="status"
                    />
                    <i
                      className="fas fa-edit"
                      title="Edit"
                      onClick={() => handleUpdateLabTest(labTest)}
                    ></i>
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
                    <input
                      className="status"
                      id="exampleInputstatus1"
                      placeholder="status"
                      onChange={handleChangeStatus}
                      name="status"
                    />
                    <i
                      className="fas fa-edit"
                      title="Edit"
                      onClick={() => handleUpdateAmbulance(ambulance)}
                    ></i>
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
              <h4>Services</h4>
            </div>

            <div className="profile-container">
              {/* Lab tests */}
              <div>
                <h5>Lab Test Bookings</h5>
                {renderLabTests()}
                <hr></hr>
                <br></br>
              </div>

              {/* Ambulance */}
              <div>
                <h5>Ambulance Bookings</h5>
                {renderAmbulances()}
                <hr></hr>
                <br></br>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
