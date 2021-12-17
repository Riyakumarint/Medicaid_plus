import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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

const Medical_profile = () => {
  const [profile, setProfile] = useState(initialState);
  const [qualifications, setQualifications] = useState([]);
  const [qualification, setQualification] = useState({major: "", college: "", passingyear: ""});
  const [specialities, setSpecialities] = useState([]);
  const [callback, setCallback] = useState(false);

  const token = useSelector((state) => state.token);

  // data fetching
  useEffect(() => {
    const getSpecialities = async () => {
      const res = await axios.get("/api/speciality");
      setSpecialities(res.data);
    };

    getSpecialities();
  }, [callback]);

  useEffect(() => {
    axios
      .get("/profiles/getMedicalProfile", { headers: { Authorization: token } })
      .then((res) => {
        setProfile(res.data);
        setQualifications(res.data.qualification);
      })
      .catch((err) => {
        setProfile({ ...profile, err: err, success: "" });
      });
  }, []);

  // handle changes
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value, err: "", success: "" });
  };
  const handleChangeQualification = (e) => {
    const { name, value } = e.target;
    setQualification({ ...qualification, [name]: value, err: "", success: "" });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        "/profiles/updateMedicalProfile",
        { profile },
        { headers: { Authorization: token } }
      );

      setProfile({ ...profile, err: "", success: "Updated Success!" });
    } catch (err) {
      setProfile({ ...profile, err: err.response.data.msg, success: "" });
    }
  };

  const handleAddQualification = async () => {
    try {
      const res = await axios.post(
        "/profiles/addQualification",
        { qualification },
        { headers: { Authorization: token } }
      );

      axios.get('/profiles/getMedicalProfile', { headers: {Authorization: token}})
      .then( res => {
        setQualifications(res.data.qualification);
      })
      .catch( err => {
        setProfile({ ...profile, err: err, success: "" });
      })

      setQualification({ major: "", college: "", passingyear: "", err: "", success: "Updated Success!" });
    } catch (err) {
      setQualification({ ...qualification, err: err.response.data.msg, success: "" });
    }
  };
  const handleDeleteQualification = async (qualificationId) => {
    try {
      const res = await axios.post(
        "/profiles/deleteQualification",
        { qualificationId },
        { headers: { Authorization: token } }
      );

      axios.get('/profiles/getMedicalProfile', { headers: {Authorization: token}})
      .then( res => {
        setQualifications(res.data.qualification);
      })
      .catch( err => {
        setProfile({ ...profile, err: err, success: "" });
      })

      setQualification({ major: "", college: "", passingyear: "", err: "", success: "Updated Success!" });
    } catch (err) {
      setQualification({ ...qualification, err: err.response.data.msg, success: "" });
    }
  };

  // renders
  const renderQualification = () =>{
    if(qualifications.length===0) return ('');
    return (
      <div className="col-right">
      <div style={{ overflowX: "auto" }}>
          <table className="medical">
            <thead>
              <tr>
                <th>Major</th>
                <th>College</th>
                <th>Year</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {qualifications.map((qualification) => (
                <tr key={qualification._id}>
                  <td>{qualification.major}</td>
                  <td>{qualification.college}</td>
                  <td>{qualification.passingyear}</td>
                  <td>
                    <i className="fas fa-trash-alt"
                      title="Remove"
                      onClick={() => handleDeleteQualification(qualification._id)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
      </div>
    )
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
                <h4>Medical Profile</h4>
                <button
                  type="submit"
                  className="button"
                  onClick={() => window.scrollTo({ top: 0 })}
                >
                  Update Profile
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

                {/* qualification block */}
                <div className="line-2">
                  <hr></hr>
                </div>
                <div>
                  <h5>Qualifications</h5>
                  {renderQualification()}
                  <div className="row">
                  <div class="col s12 m6 l4">
                    <div className="form-group">
                      <div className="input-field">
                        <label htmlFor="major">Major</label>
                        <input
                          className="major"
                          id="exampleInputmajor1"
                          placeholder="major"
                          onChange={handleChangeQualification}
                          value={qualification.major}
                          name="major"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col s12 m6 l4">
                    <div className="form-group">
                      <div className="input-field">
                        <label htmlFor="college">College</label>
                        <input
                          className="college"
                          id="exampleInputcollege1"
                          placeholder="college"
                          onChange={handleChangeQualification}
                          value={qualification.college}
                          name="college"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col s12 m6 l4">
                    <div className="form-group">
                      <div className="input-field">
                        <label htmlFor="passingyear">Year</label>
                        <input
                          className="passingyear"
                          id="exampleInputpassingyear1"
                          placeholder="passingyear"
                          onChange={handleChangeQualification}
                          value={qualification.passingyear}
                          name="passingyear"
                        />
                      </div>
                    </div>
                  </div>
                  <div >
                    <div className="form-group">
                      <div className="input-field">
                        <i
                        className="fas fa-plus-circle"
                        title="Add"
                        onClick={() => handleAddQualification()}
                        ></i>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>

                {/* experience block */}
                <div className="line-2">
                  <hr></hr>
                </div>
                <div className="row">
                  {/* <div class="col s12 m6 l4">
                    <div className="form-group">
                      <div className="input-field">
                        <label htmlFor="speciality_name">Speciality Name</label>
                        <input
                          className="speciality_name"
                          id="exampleInputspeciality_name1"
                          placeholder="speciality_name"
                          onChange={handleChangeInput}
                          value={profile.speciality_name}
                          name="speciality_name"
                        />
                      </div>
                    </div>
                  </div> */}
                  <div class="col s12 m6 l4">
                    <div className="form-group">
                    <label htmlFor="speciality_name">Speciality Name</label>
                      <select
                        className="form-control text-capitalize speciality_name"
                        value={profile.speciality_name}
                        name="speciality_name"
                        onChange={handleChangeInput}
                      >
                        <option value="">Choose a speciality</option>
                        {specialities.map((speciality) => (
                          <option key={speciality._id} value={speciality._id}>
                            {speciality.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div class="col s12 m6 l4">
                    <div className="form-group">
                      <div className="input-field">
                        <label htmlFor="experience_year">Experience year</label>
                        <input
                          className="experience_year"
                          id="exampleInputexperience_year1"
                          placeholder="experience_year"
                          onChange={handleChangeInput}
                          value={profile.experience_year}
                          name="experience_year"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Medical_profile;
