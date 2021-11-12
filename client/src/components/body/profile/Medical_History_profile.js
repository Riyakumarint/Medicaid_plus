import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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

const Medical_History_profile = () => {
  const [profile, setProfile] = useState(initialState);

  const token = useSelector((state) => state.token);

  const {
    bloodGroup,
    age,
    major,
    college,
    passingyear,
    experience_year,
    speciality_name,
    err,
    success,
  } = profile;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "/profiles/createMedicalProfile",
        {
          bloodGroup,
          age,
          major,
          college,
          passingyear,
          speciality_name,
          experience_year,
        },
        {
          headers: { Authorization: token },
        }
      );

      setProfile({ ...profile, err: "", success: res.data.msg });
    } catch (err) {
      setProfile({ ...profile, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <>
      <SideNav />
      <div className="continer-profile">
        <div className="pro">
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}
          <div className="profile_page">
            <div className="profile_header">
              <h4 className="title">Edit Profile</h4>
              <button type="submit" className="button" onSubmit={handleSubmit}>
                Profile
              </button>{" "}
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
                        value={bloodGroup}
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
                        value={age}
                        name="age"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="line-2">
                <hr></hr>
              </div>
              <h4 className="title">Qualification</h4>
              <div className="row">
                <div class="col s12 m6 l4">
                  <div className="form-group">
                    <div className="input-field">
                      <label htmlFor="major">Major</label>{" "}
                      <input
                        className="major"
                        id="exampleInputmajor1"
                        placeholder="major"
                        onChange={handleChangeInput}
                        value={major}
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
                        onChange={handleChangeInput}
                        value={college}
                        name="college"
                      />
                    </div>
                  </div>
                </div>
                <div class="col s12 m6 l4">
                  <div className="form-group">
                    <div className="input-field">
                      <label htmlFor="passingyear">Passing year</label>{" "}
                      <input
                        className="passingyear"
                        id="exampleInputpassingyear1"
                        placeholder="passingyear"
                        onChange={handleChangeInput}
                        value={passingyear}
                        name="passingyear"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="line-2">
                <hr></hr>
              </div>
              <div className="row">
                <div class="col s12 m6 l4">
                  <div className="form-group">
                    <div className="input-field">
                      <label htmlFor="speciality_name">Speciality</label>{" "}
                      <input
                        className="speciality_name"
                        id="exampleInputspeciality_name1"
                        placeholder="speciality_name"
                        onChange={handleChangeInput}
                        value={speciality_name}
                        name="speciality_name"
                      />
                    </div>
                  </div>
                </div>
                <div class="col s12 m6 l4">
                  <div className="form-group">
                    <div className="input-field">
                      <label htmlFor="experience_year">Experience year</label>{" "}
                      <input
                        className="experience_year"
                        id="exampleInputexperience_year1"
                        placeholder="experience_year"
                        onChange={handleChangeInput}
                        value={experience_year}
                        name="experience_year"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Medical_History_profile;
