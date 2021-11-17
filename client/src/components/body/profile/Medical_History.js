import React, { useState, useEffect } from "react";
import {  useHistory } from "react-router-dom";
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
  const [emergencyContact, setEmergencyContact] = useState(initialStateEmergency);

  const token = useSelector((state) => state.token);

  useEffect(()=> {
    axios.get('/profiles/getMedicalHistory', { headers: {Authorization: token}})
    .then( res => {
      setProfile(res.data);
      setEmergencyContact(res.data.emergencyContact);
    })
    .catch( err => {
      setProfile({ ...profile, err: err, success: "" });
    })
  }, [])

  // const history = useHistory();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value, err: "", success: "" });
  };
  const handleEmergencyChangeInput = (e) => {
    const { name, value } = e.target;
    setEmergencyContact({ ...emergencyContact, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        "/profiles/updateMedicalHistory",
        {
          profile,
          emergencyContact
        },
        {
          headers: { Authorization: token },
        }
      );

      setProfile({ ...profile, err: "", success: "Updated Success!" });

      // history.push("/profile");
    } catch (err) {
      setProfile({ ...profile, err: err.response.data.msg, success: "" });
    }
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
                        <label htmlFor="address">address</label>
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
