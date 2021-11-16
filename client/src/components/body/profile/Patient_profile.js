import React, { useState } from "react";
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

const Patient_profile = () => {
  const [profile, setProfile] = useState(initialState);

  const token = useSelector((state) => state.token);
  const history = useHistory();

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
        {err && showErrMsg(err)}
              {success && showSuccessMsg(success)}
        <form onSubmit={handleSubmit}>
          <div className="profile_page">
           
              
              <div className="profile_header">
                <h4>Edit Profile</h4>
                <button
                  type="submit"
                  className="button"
                  onClick={() => window.scrollTo({ top: 0 })}
                >
                  Profile
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
                        <label htmlFor="major">major</label>
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
                        <label htmlFor="passingyear">passingyear</label>
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
                        <label htmlFor="speciality_name">Speciality Name</label>
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
                        <label htmlFor="experience_year">Experience year</label>
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
          </form>
        </div>
      </div>
    </>
  );
};

export default Patient_profile;

// const initial_State = {
//   bloodGroup: "",
//   age: "",
//   err: "",
//   success: "",
// }

// const initialState = {
//   qualification: [
//     {
//       major: "",
//       college: "",
//       passingyear: "",
//     },
//   ],
//   speciality: [
//     {
//       name: "",
//     },
//   ],
//   experience: {
//     year: "",
//   },
//   err: "",
//   success: "",
// };

// const Patient_profile = () => {
//   const [profile, setProfile] = useState(initial_State);

//   const [major, setMajor] = useState(initialState.qualification.major);
//   const [college, setCollege] = useState(initialState.qualification.college);
//   const [passingyear, setPassingyear] = useState(initialState.qualification.passingyear);
//   const [name, setName] = useState(initialState.speciality.name);
//   const [year, setYear] = useState(initialState.experience.year);
//   const token = useSelector((state) => state.token);
//   const history = useHistory();

//   const {
//     bloodGroup,
//     age,
//     err,
//     success
//   } = profile;

//   const {
//     major,
//     err,
//     success
//   } = major;
//   const {
//     college,
//     err,
//     success
//   } = college;
//   const {
//     passingyear,
//     err,
//     success
//   } = passingyear;
//   const {
//     name,
//     err,
//     success
//   } = name;
//   const {
//     year,
//     err,
//     success
//   } = year;

//   const handleChangeInput1 = (e) => {
//     const { name, value } = e.target;
//     setProfile({ ...profile, [name]: value, err: "", success: "" });
//   };

//   const handleChangeInput2 = (e) => {
//     const { name, value } = e.target;
//     setMajor({ ...major, [name]: value, err: "", success: "" });
//   };
//   const handleChangeInput3 = (e) => {
//     const { name, value } = e.target;
//     setCollege({ ...college, [name]: value, err: "", success: "" });
//   };
//   const handleChangeInput4 = (e) => {
//     const { name, value } = e.target;
//     setPassingyear({ ...passingyear, [name]: value, err: "", success: "" });
//   };
//   const handleChangeInput5 = (e) => {
//     const { name, value } = e.target;
//     setName({ ...name, [name]: value, err: "", success: "" });
//   };
//   const handleChangeInput6 = (e) => {
//     const { name, value } = e.target;
//     setYear({ ...year, [name]: value, err: "", success: "" });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         "/profiles/createMedicalProfile",
//         { bloodGroup, age, major, college, passingyear, name, year },
//         {
//           headers: { Authorization: token },
//         }
//       );

//       setProfile({ ...profile, err: "", success: res.data.msg });

//       setMajor({ ...major, err: "", success: res.data.msg });
//       setCollege({ ...college, err: "", success: res.data.msg });
//       setPassingyear({ ...passingyear, err: "", success: res.data.msg });
//       setName({ ...name, err: "", success: res.data.msg });
//       setYear({ ...year, err: "", success: res.data.msg });

//       history.push("/profile");
//     } catch (err) {
//       setProfile({ ...profile, err: err.response.data.msg, success: "" });

//       setMajor({ ...major, eerr: err.response.data.msg, success: "" });
//       setCollege({ ...college, err: err.response.data.msg, success: "" });
//       setPassingyear({
//         ...passingyear,
//         err: err.response.data.msg,
//         success: "",
//       });
//       setName({ ...name, err: err.response.data.msg, success: "" });
//       setYear({ ...year, err: err.response.data.msg, success: "" });
//     }
//   };

//   return (
//     <div className="container_sign Patient_profile">
//       <div className="forms-container">
//         <div className="signin-signup">
//           <form onSubmit={handleSubmit}>
//             <h3 className="title">Edit Profile</h3>
//             {err && showErrMsg(err)}
//             {success && showSuccessMsg(success)}
//             <div className="form-group">
//               <div className="input-field">
//                 <i class="fa fa-tint" aria-hidden="true"></i>
//                 <input
//                   type="bloodGroup"
//                   className="bloodGroup"
//                   id="exampleInputtest"
//                   aria-describedby="bloodGroup"
//                   placeholder="bloodGroup"
//                   onChange={handleChangeInput1}
//                   name="bloodGroup"
//                   value={bloodGroup}
//                 />
//               </div>
//             </div>
//             <div className="form-group">
//               <div className="input-field">
//                 <i className="fa fa-user-plus" aria-hidden="true"></i>
//                 <input
//                   className="age"
//                   id="exampleInputage1"
//                   placeholder="age"
//                   onChange={handleChangeInput1}
//                   value={age}
//                   name="age"
//                 />
//               </div>
//             </div>
//             <div className="form-group">
//               <div className="input-field">
//                 <i className="fa fa-user-plus" aria-hidden="true"></i>
//                 <input
//                   className="major"
//                   id="exampleInputmajor1"
//                   placeholder="major"
//                   onChange={handleChangeInput2}
//                   value={major}
//                   name="major"
//                 />
//               </div>
//             </div>
//             <div className="form-group">
//               <div className="input-field">
//                 <i className="fa fa-user-plus" aria-hidden="true"></i>
//                 <input
//                   className="college"
//                   id="exampleInputcollege1"
//                   placeholder="college"
//                   onChange={handleChangeInput3}
//                   value={college}
//                   name="college"
//                 />
//               </div>
//             </div>
//             <div className="form-group">
//               <div className="input-field">
//                 <i className="fa fa-user-plus" aria-hidden="true"></i>
//                 <input
//                   className="passingyear"
//                   id="exampleInputpassingyear1"
//                   placeholder="passingyear"
//                   onChange={handleChangeInput4}
//                   value={passingyear}
//                   name="passingyear"
//                 />
//               </div>
//             </div>
//             <div className="form-group">
//               <div className="input-field">
//                 <i className="fa fa-user-plus" aria-hidden="true"></i>
//                 <input
//                   className="name"
//                   id="exampleInputname1"
//                   placeholder="name"
//                   onChange={handleChangeInput5}
//                   value={name}
//                   name="name"
//                 />
//               </div>
//             </div>
//             <div className="form-group">
//               <div className="input-field">
//                 <i className="fa fa-user-plus" aria-hidden="true"></i>
//                 <input
//                   className="year"
//                   id="exampleInputyear1"
//                   placeholder="year"
//                   onChange={handleChangeInput6}
//                   value={year}
//                   name="year"
//                 />
//               </div>
//             </div>
//             <button
//               type="submit"
//               className="button"
//               disabled={bloodGroup && age ? false : true}
//               onClick={() => window.scrollTo({ top: 0 })}
//             >
//               Profile
//             </button>{" "}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Patient_profile;
