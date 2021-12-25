import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import SideNav from "./sidenav/SideNav";

const initialState = {
  bloodGroup: "",
  age: "",
  major: "",
  college: "",
  passingyear: "",
  speciality_name: "",
  experience_year: "",
  err: "",
  success: "",
};
const initialStateEmergency = {
  name: "",
  relation: "",
  mobile: "",
  emailAdd: "",
  address: "",
  err: "",
  success: "",
};

const Medical_history = () => {
  const [profile, setProfile] = useState(initialState);
  const [emergencyContact, setEmergencyContact] = useState(
    initialStateEmergency
  );
  const [currentMedication, setCurrentMedication] = useState([]);
  const [currMed, setCurrMed] = useState({ name: "", dose: "" });
  const [medicalCondition, setMedicalCondition] = useState([]);
  const [medCond, setMedCond] = useState({
    name: "",
    fromWhen: "",
    currentStatus: "",
  });
  const [allergies, setAllergies] = useState([]);
  const [allergie, setAllergie] = useState({ name: "" });

  const token = useSelector((state) => state.token);

  // fetching data
  useEffect(() => {
    window.scrollTo({ top: 0 });
    axios
      .get("/profiles/getMedicalHistory", { headers: { Authorization: token } })
      .then((res) => {
        setProfile(res.data);
        setEmergencyContact(res.data.emergencyContact);
        setCurrentMedication(res.data.currentMedication);
        setMedicalCondition(res.data.medicalCondition);
        setAllergies(res.data.allergies);
      })
      .catch((err) => {
        setProfile({ ...profile, err: err, success: "" });
      });
  }, [token]);

  // handle changes
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value, err: "", success: "" });
  };
  const handleEmergencyChangeInput = (e) => {
    const { name, value } = e.target;
    setEmergencyContact({
      ...emergencyContact,
      [name]: value,
      err: "",
      success: "",
    });
  };
  const handleCurrMedChangeInput = (e) => {
    const { name, value } = e.target;
    setCurrMed({ ...currMed, [name]: value, err: "", success: "" });
  };
  const handleMedCondChangeInput = (e) => {
    const { name, value } = e.target;
    setMedCond({ ...medCond, [name]: value, err: "", success: "" });
  };
  const handleAllergieChangeInput = (e) => {
    const { name, value } = e.target;
    setAllergie({ ...allergie, [name]: value, err: "", success: "" });
  };

  // handle submits
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        "/profiles/updateMedicalHistory",
        {
          profile,
          emergencyContact,
        },
        { headers: { Authorization: token } }
      );

      setProfile({ ...profile, err: "", success: "Updated Success!" });
    } catch (err) {
      setProfile({ ...profile, err: err.response.data.msg, success: "" });
    }
  };

  const handleAddMed = async () => {
    try {
      const res = await axios.post(
        "/profiles/addCurrMedicines",
        { currMed },
        { headers: { Authorization: token } }
      );

      axios
        .get("/profiles/getMedicalHistory", {
          headers: { Authorization: token },
        })
        .then((res) => {
          setCurrentMedication(res.data.currentMedication);
        })
        .catch((err) => {
          setProfile({ ...profile, err: err, success: "" });
        });

      setCurrMed({ name: "", dose: "", err: "", success: "Updated Success!" });
    } catch (err) {
      setCurrMed({ ...currMed, err: err.response.data.msg, success: "" });
    }
  };
  const handleDeleteMed = async (medId) => {
    try {
      const res = await axios.post(
        "/profiles/deleteCurrMedicines",
        { medId },
        { headers: { Authorization: token } }
      );

      axios
        .get("/profiles/getMedicalHistory", {
          headers: { Authorization: token },
        })
        .then((res) => {
          setCurrentMedication(res.data.currentMedication);
        })
        .catch((err) => {
          setProfile({ ...profile, err: err, success: "" });
        });

      setCurrMed({ name: "", dose: "", err: "", success: "Updated Success!" });
    } catch (err) {
      setCurrMed({ ...currMed, err: err.response.data.msg, success: "" });
    }
  };

  const handleAddMedCond = async () => {
    try {
      const res = await axios.post(
        "/profiles/addMedCondition",
        { medCond },
        { headers: { Authorization: token } }
      );

      axios
        .get("/profiles/getMedicalHistory", {
          headers: { Authorization: token },
        })
        .then((res) => {
          setMedicalCondition(res.data.medicalCondition);
        })
        .catch((err) => {
          setProfile({ ...profile, err: err, success: "" });
        });

      setMedCond({
        name: "",
        fromWhen: "",
        currentStatus: "",
        err: "",
        success: "Updated Success!",
      });
    } catch (err) {
      setMedCond({ ...medCond, err: err.response.data.msg, success: "" });
    }
  };
  const handleDeleteMedCond = async (condId) => {
    try {
      const res = await axios.post(
        "/profiles/deleteMedCondition",
        { condId },
        { headers: { Authorization: token } }
      );

      axios
        .get("/profiles/getMedicalHistory", {
          headers: { Authorization: token },
        })
        .then((res) => {
          setMedicalCondition(res.data.medicalCondition);
        })
        .catch((err) => {
          setProfile({ ...profile, err: err, success: "" });
        });

      setMedCond({
        name: "",
        fromWhen: "",
        currentStatus: "",
        err: "",
        success: "Updated Success!",
      });
    } catch (err) {
      setMedCond({ ...medCond, err: err.response.data.msg, success: "" });
    }
  };

  const handleAddAllergie = async () => {
    try {
      const res = await axios.post(
        "/profiles/addAllergies",
        { allergie },
        { headers: { Authorization: token } }
      );

      axios
        .get("/profiles/getMedicalHistory", {
          headers: { Authorization: token },
        })
        .then((res) => {
          setAllergies(res.data.allergies);
        })
        .catch((err) => {
          setProfile({ ...profile, err: err, success: "" });
        });

      setAllergie({ name: "", err: "", success: "Updated Success!" });
    } catch (err) {
      setAllergie({ ...allergie, err: err.response.data.msg, success: "" });
    }
  };
  const handleDeleteAllergie = async (allergieId) => {
    try {
      const res = await axios.post(
        "/profiles/deleteAllergies",
        { allergieId },
        { headers: { Authorization: token } }
      );

      axios
        .get("/profiles/getMedicalHistory", {
          headers: { Authorization: token },
        })
        .then((res) => {
          setAllergies(res.data.allergies);
        })
        .catch((err) => {
          setProfile({ ...profile, err: err, success: "" });
        });

      setAllergie({ name: "", err: "", success: "Updated Success!" });
    } catch (err) {
      setAllergie({ ...allergie, err: err.response.data.msg, success: "" });
    }
  };

  // renders
  const renderCurrentMedication = () => {
    if (currentMedication.length === 0) return "";
    return (
      <div className="col-right">
        <div style={{ overflowX: "auto" }}>
          <table className="medical">
            <thead>
              <tr>
                <th>Name</th>
                <th>Dose</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentMedication.map((currMed) => (
                <tr key={currMed._id}>
                  <td>{currMed.name}</td>
                  <td>{currMed.dose}</td>
                  <td>
                    <i
                      className="fas fa-trash-alt"
                      title="Remove"
                      onClick={() => handleDeleteMed(currMed._id)}
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

  const renderMedicalCondition = () => {
    if (medicalCondition.length === 0) return "";
    return (
      <div className="col-right">
        <div style={{ overflowX: "auto" }}>
          <table className="medical">
            <thead>
              <tr>
                <th>Name</th>
                <th>From</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {medicalCondition.map((medCond) => (
                <tr key={medCond._id}>
                  <td>{medCond.name}</td>
                  <td>{medCond.fromWhen}</td>
                  <td>{medCond.currentStatus}</td>
                  <td>
                    <i
                      className="fas fa-trash-alt"
                      title="Remove"
                      onClick={() => handleDeleteMedCond(medCond._id)}
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

  const renderAllergies = () => {
    if (allergies.length === 0) return "";
    return (
      <div className="col-right">
        <div style={{ overflowX: "auto" }}>
          <table className="medical">
            <thead>
              <tr>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allergies.map((allergie) => (
                <tr key={allergie._id}>
                  <td>{allergie.name}</td>
                  <td>
                    <i
                      className="fas fa-trash-alt"
                      title="Remove"
                      onClick={() => handleDeleteAllergie(allergie._id)}
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
          {profile.err && showErrMsg(profile.err)}
          {profile.success && showSuccessMsg(profile.success)}
          <form onSubmit={handleSubmit}>
            <div className="profile_page">
              <div className="profile_header">
                <h4>Medical History</h4>
                <button
                  type="submit"
                  className="button"
                  onClick={() => window.scrollTo({ top: 0 })}
                >
                  Update History
                </button>
              </div>

              {/* general block */}
              <div className="profile-container">
                <div className="row">
                  <div class="col s12 m6 l4">
                    <div className="form-group">
                      <div className="input-field">
                        <label htmlFor="bloodGroup">Blood Group</label>
                        <input
                          type="bloodGroup"
                          className="bloodGroup"
                          id="exampleInputtest"
                          aria-describedby="bloodGroup"
                          placeholder="bloodGroup"
                          onChange={handleChangeInput}
                          name="bloodGroup"
                          value={profile.bloodGroup}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col s12 m6 l4">
                    <div className="form-group">
                      <div className="input-field">
                        <label htmlFor="age">Age</label>
                        <input
                          className="age"
                          id="exampleInputage1"
                          placeholder="age"
                          onChange={handleChangeInput}
                          value={profile.age}
                          name="age"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div class="col s12 m6 l4">
                    <div className="form-group">
                      <div className="input-field">
                        <label htmlFor="height">Height</label>
                        <input
                          type="height"
                          className="height"
                          id="exampleInputtest"
                          aria-describedby="height"
                          placeholder="height"
                          onChange={handleChangeInput}
                          name="height"
                          value={profile.height}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col s12 m6 l4">
                    <div className="form-group">
                      <div className="input-field">
                        <label htmlFor="weight">Weight</label>
                        <input
                          className="weight"
                          id="exampleInputage1"
                          placeholder="weight"
                          onChange={handleChangeInput}
                          value={profile.weight}
                          name="weight"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div class="col s12 m6 l4">
                    <div className="form-group">
                      <div className="input-field">
                        <label htmlFor="weight">Pulse</label>
                        <input
                          className="pulse"
                          id="exampleInputage1"
                          placeholder="pulse"
                          onChange={handleChangeInput}
                          value={profile.pulse}
                          name="pulse"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col s12 m6 l4">
                    <div className="form-group">
                      <div className="input-field">
                        <label htmlFor="weight">Blood Sugar</label>
                        <input
                          className="bloodSugar"
                          id="exampleInputage1"
                          placeholder="bloodSugar"
                          onChange={handleChangeInput}
                          value={profile.bloodSugar}
                          name="bloodSugar"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col s12 m6 l4">
                    <div className="form-group">
                      <div className="input-field">
                        <label htmlFor="weight">Oxygen Level</label>
                        <input
                          className="oxygenLevel"
                          id="exampleInputage1"
                          placeholder="oxygenLevel"
                          onChange={handleChangeInput}
                          value={profile.oxygenLevel}
                          name="oxygenLevel"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* current medicine block */}
                <div className="line-2">
                  <hr></hr>
                </div>
                <div>
                  <h5>Current Medication</h5>
                  {renderCurrentMedication()}
                  <div className="row">
                    <div class="col s12 m6 l4">
                      <div className="form-group">
                        <div className="input-field">
                          <label htmlFor="name">Name</label>
                          <input
                            className="name"
                            id="exampleInputname1"
                            placeholder="name"
                            onChange={handleCurrMedChangeInput}
                            value={currMed.name}
                            name="name"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col s12 m6 l4">
                      <div className="form-group">
                        <div className="input-field">
                          <label htmlFor="dose">Dose</label>
                          <input
                            className="dose"
                            id="exampleInputdose1"
                            placeholder="dose"
                            onChange={handleCurrMedChangeInput}
                            value={currMed.dose}
                            name="dose"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col s12 m6 l4">
                      <div className="form-group">
                        <div className="input-field">
                          <i
                            className="fas fa-plus-circle"
                            title="Add"
                            onClick={() => handleAddMed()}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* medical condition block */}
                <div className="line-2">
                  <hr></hr>
                </div>
                <div>
                  <h5>Medical Condition</h5>
                  {renderMedicalCondition()}
                  <div className="row">
                    <div class="col s12 m6 l4">
                      <div className="form-group">
                        <div className="input-field">
                          <label htmlFor="name">Name</label>
                          <input
                            className="name"
                            id="exampleInputname1"
                            placeholder="name"
                            onChange={handleMedCondChangeInput}
                            value={medCond.name}
                            name="name"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col s12 m6 l4">
                      <div className="form-group">
                        <div className="input-field">
                          <label htmlFor="fromWhen">From</label>
                          <input
                            className="fromWhen"
                            id="exampleInputfromWhen1"
                            placeholder="fromWhen"
                            onChange={handleMedCondChangeInput}
                            value={medCond.fromWhen}
                            name="fromWhen"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col s12 m6 l4">
                      <div className="form-group">
                        <div className="input-field">
                          <label htmlFor="currentStatus">Status</label>
                          <input
                            className="currentStatus"
                            id="exampleInputcurrentStatus1"
                            placeholder="currentStatus"
                            onChange={handleMedCondChangeInput}
                            value={medCond.currentStatus}
                            name="currentStatus"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="form-group">
                        <div className="input-field">
                          <i
                            className="fas fa-plus-circle"
                            title="Add"
                            onClick={() => handleAddMedCond()}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* allergies block */}
                <div className="line-2">
                  <hr></hr>
                </div>
                <div>
                  <h5>Allergies</h5>
                  {renderAllergies()}
                  <div className="row">
                    <div class="col s12 m6 l4">
                      <div className="form-group">
                        <div className="input-field">
                          <label htmlFor="name">Name</label>
                          <input
                            className="name"
                            id="exampleInputname1"
                            placeholder="name"
                            onChange={handleAllergieChangeInput}
                            value={allergie.name}
                            name="name"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col s12 m6 l4">
                      <div className="form-group">
                        <div className="input-field">
                          <i
                            className="fas fa-plus-circle"
                            title="Add"
                            onClick={() => handleAddAllergie()}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* habits block */}
                <div className="line-2">
                  <hr></hr>
                </div>
                <div className="row">
                  <div class="col s12 m6 l4">
                    <div className="form-group">
                      <div className="input-field">
                        <label htmlFor="useTobacco">Use Tobacco</label>
                        <input
                          className="useTobacco"
                          id="exampleInputspeciality_name1"
                          placeholder="useTobacco"
                          onChange={handleChangeInput}
                          value={profile.useTobacco}
                          name="useTobacco"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col s12 m6 l4">
                    <div className="form-group">
                      <div className="input-field">
                        <label htmlFor="useAlcohol">Use Alcohol</label>
                        <input
                          className="useAlcohol"
                          id="exampleInputexperience_year1"
                          placeholder="useAlcohol"
                          onChange={handleChangeInput}
                          value={profile.useAlcohol}
                          name="useAlcohol"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* emergency contact block */}
                <div className="line-2">
                  <hr></hr>
                </div>
                <h4 className="title">Emergency Contact</h4>
                <div className="row">
                  <div class="col s12 m6 l4">
                    <div className="form-group">
                      <div className="input-field">
                        <label htmlFor="name">Name</label>
                        <input
                          type="name"
                          className="name"
                          id="exampleInputtest"
                          aria-describedby="name"
                          placeholder="name"
                          onChange={handleEmergencyChangeInput}
                          name="name"
                          value={emergencyContact.name}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col s12 m6 l4">
                    <div className="form-group">
                      <div className="input-field">
                        <label htmlFor="relation">Relation</label>
                        <input
                          className="relation"
                          id="exampleInputage1"
                          placeholder="relation"
                          onChange={handleEmergencyChangeInput}
                          value={emergencyContact.relation}
                          name="relation"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div class="col s12 m6 l4">
                    <div className="form-group">
                      <div className="input-field">
                        <label htmlFor="mobile">Mobile</label>
                        <input
                          className="mobile"
                          id="exampleInputmajor1"
                          placeholder="mobile"
                          onChange={handleEmergencyChangeInput}
                          value={emergencyContact.mobile}
                          name="mobile"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col s12 m6 l4">
                    <div className="form-group">
                      <div className="input-field">
                        <label htmlFor="emailAdd">Email</label>
                        <input
                          className="emailAdd"
                          id="exampleInputcollege1"
                          placeholder="email"
                          onChange={handleEmergencyChangeInput}
                          value={emergencyContact.emailAdd}
                          name="emailAdd"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col s12 m6 l4">
                    <div className="form-group">
                      <div className="input-field">
                        <label htmlFor="address">Address</label>
                        <input
                          className="address"
                          id="exampleInputpassingyear1"
                          placeholder="address"
                          onChange={handleEmergencyChangeInput}
                          value={emergencyContact.address}
                          name="address"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="line-2">
                  <hr></hr>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Medical_history;
