import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import SideNav from "../profile/sidenav/SideNav";

const initialState = {
    patienttId: "",
    doctortId: "",
    status: "",
    date: "",

    title: "",
    description: "",

    meetingDetail: "",

    err: "",
    success: "",
};

const Create_appointment = () => {
  const [appointmentDetails, setAppointmentDetails] = useState(initialState);
  const [symptom, setSymptom] = useState({name: "", fromWhen: ""});
  const [symptoms, setSymptoms] = useState([]);
  const [previousMed, setPreviousMed] = useState({name: "", dose: ""});
  const [previousMedicine, setPreviousMedicine] = useState([]);
  const [previousTestReport, setPreviousTestReport] = useState({link: ""});
  const [previousTestReports, setPreviousTestReports] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [speciality, setSpeciality] = useState({speciality_name: ""});
  const [doctors, setDoctors] = useState([]);
  const [callback, setCallback] = useState(false);

  const token = useSelector((state) => state.token);
  const {user} = useSelector((state) => state.auth);

  // data fetching
  useEffect(() => {
    const getSpecialities = async () => {
      const res = await axios.get("/api/speciality");
      setSpecialities(res.data);
    };
    getSpecialities();
  }, [callback]);

  // handle changes
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setAppointmentDetails({ ...appointmentDetails, [name]: value, err: "", success: "" });
  };

  const handleChangeSpeciality = async (e) => {
    const { name, value } = e.target;
    setSpeciality({ ...speciality, [name]: value});
    setAppointmentDetails({...appointmentDetails, doctortId: ""});
    try {
      console.log(speciality.speciality_name);
      const res = await axios.get(
        "/api/fetchDoctorBySpeciality/"+e.target.value,
        { headers: { Authorization: token } }
      );
      setDoctors(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeDoctor = async (e) => {
    const { name, value } = e.target;
    setAppointmentDetails({...appointmentDetails, [name]: value});
  }

  const handleChangeSymptom = (e) => {
    const { name, value } = e.target;
    setSymptom({ ...symptom, [name]: value});
  };

  const handleChangePreviousMed = (e) => {
    const { name, value } = e.target;
    setPreviousMed({ ...previousMed, [name]: value});
  };

  const handleChangePreviousTestReport = (e) => {
    const { name, value } = e.target;
    setPreviousTestReport({ ...previousTestReport, [name]: value});
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(
        !appointmentDetails.doctortId ||
        !appointmentDetails.title ||
        !appointmentDetails.description ||
        !symptoms
      )
        return setAppointmentDetails({ ...appointmentDetails, err: "Please fill in all fields.", success: ""});

      const appointmentDetail = {...appointmentDetails, 
      patienttId: user._id,
      status: "active", 
      date: Date(new Date),
      symptoms:symptoms,
      previousMedicine:previousMedicine, 
      previousTestReports:previousTestReports,
      meetingDetail: "Fri Dec 17 2021 13:22:28 GMT+0530 (India Standard Time)",
      err: "", success: "",}
      const c={
        senderId:user._id,
        receiverId:appointmentDetails.doctortId,
      };
      try{
      const conversation = await axios.post("/conversations",c);
      console.log(conversation);
      }
      catch(err){
        console.log(err);
      }
    try {
      // await updateAppointmentDetails();
      const res = await axios.post(
        "/appointments/createAppointment",
        { appointmentDetail},
        { headers: { Authorization: token } }
      );

      setAppointmentDetails({ ...appointmentDetails, err: "", success: "Appointment Created Success!" });
    } catch (err) {
      setAppointmentDetails({ ...appointmentDetails, err: err.response.data.msg, success: "" });
    }
  };

  const handleAddSymptom = async () => {
    try {
      setSymptoms([...symptoms, symptom]);
      setSymptom({ name: "", fromWhen: ""});
    } catch (err) {
      setSymptom({ ...symptom});
    }
  };
  const handleDeleteSymptom = async (symptomName) => {
    try {
        const newSymptoms = symptoms.filter( (symptom) =>{
            return symptom.name !== symptomName;
        });
        setSymptoms(newSymptoms);
        setSymptom({ name: "", fromWhen: "" });
      } catch (err) {
        setSymptom({ ...symptom});
      }
  };

  const handleAddPreviousMedicine = async () => {
    try {
      setPreviousMedicine([...previousMedicine, previousMed]);
      setPreviousMed({ name: "", dose: ""});
    } catch (err) {
        setPreviousMed({ ...previousMed});
    }
  };
  const handleDeletePreviousMedicine = async (previousMedName) => {
    try {
        const newPreviousMedicine = previousMedicine.filter( (previousMed) =>{
            return previousMed.name !== previousMedName;
        });
        setPreviousMedicine(newPreviousMedicine);
      setPreviousMed({ name: "", dose: ""});
    } catch (err) {
        setPreviousMed({ ...previousMed});
    }
  };

  const handleAddPreviousTestReport = async () => {
    try {
      setPreviousTestReports([...previousTestReports, previousTestReport]);
      setPreviousTestReport({ link: ""});
    } catch (err) {
        setPreviousTestReport({ ...previousMed});
    }
  };
  const handleDeletePreviousTestReport = async (previousReportLink) => {
    try {
        const newPreviousTestReport = previousTestReports.filter( (previousTestReport) =>{
            return previousTestReport.link !== previousReportLink;
        });
        setPreviousTestReports(newPreviousTestReport);
      setPreviousTestReport({ link: ""});
    } catch (err) {
        setPreviousTestReport({ ...previousMed});
    }
  };

  // renders
  const renderSymptom = () =>{
    if(symptoms.length===0) return ('');
    return (
      <div className="col-right">
      <div style={{ overflowX: "auto" }}>
          <table className="medical">
            <thead>
              <tr>
                <th>Name</th>
                <th>From when</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {symptoms.map((symptom) => (
                <tr key={symptom.name}>
                  <td>{symptom.name}</td>
                  <td>{symptom.fromWhen}</td>
                  <td>
                    <i className="fas fa-trash-alt"
                      title="Remove"
                      onClick={() => handleDeleteSymptom(symptom.name)}
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

  const renderPreviousMedicine = () =>{
    if(previousMedicine.length===0) return ('');
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
              {previousMedicine.map((previousMed) => (
                <tr key={previousMed.name}>
                  <td>{previousMed.name}</td>
                  <td>{previousMed.dose}</td>
                  <td>
                    <i className="fas fa-trash-alt"
                      title="Remove"
                      onClick={() => handleDeletePreviousMedicine(previousMed.name)}
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

  const renderPreviousTestReport = () =>{
    if(previousTestReports.length===0) return ('');
    return (
      <div className="col-right">
      <div style={{ overflowX: "auto" }}>
          <table className="medical">
            <thead>
              <tr>
                <th>link</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {previousTestReports.map((previousTestReport) => (
                <tr key={previousTestReport.link}>
                  <td>{previousTestReport.link}</td>
                  <td>
                    <i className="fas fa-trash-alt"
                      title="Remove"
                      onClick={() => handleDeletePreviousTestReport(previousTestReport.link)}
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
          {appointmentDetails.err && showErrMsg(appointmentDetails.err)}
          {appointmentDetails.success && showSuccessMsg(appointmentDetails.success)}
          <form onSubmit={handleSubmit}>
            <div className="profile_page">
              <div className="profile_header">
                <h4>Create Appointment</h4>
                <button
                  type="submit"
                  className="button"
                  onClick={() => window.scrollTo({ top: 0 })}
                >
                  Book
                </button>
              </div>

              {/* title and description block */}
              <div className="profile-container">
                <div className="row">
                  <div class="col s12 m6 l4">
                    <div className="form-group">
                      <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input
                          type="title"
                          className="title"
                          id="exampleTitle"
                          aria-describedby="title"
                          placeholder="title"
                          onChange={handleChangeInput}
                          name="title"
                          value={appointmentDetails.title}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div class="col s12 m6 l4">
                    <div className="form-group">
                      <div className="input-field">
                        <label htmlFor="description">Description</label>
                        <textarea 
                            rows="3" 
                            cols="30"
                            type="description"
                            className="description"
                            id="exampleDescription"
                            aria-describedby="description"
                            placeholder="description"
                              onChange={handleChangeInput}
                            name="description"
                            value={appointmentDetails.description}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Selectdoctor and catagory block */}
                <div className="row">
                  <div class="col s12 m6 l4">
                    <div className="form-group">
                    <label htmlFor="speciality_name">Speciality</label>
                      <select
                        className="form-control text-capitalize speciality_name"
                        value={speciality.speciality_name}
                        name="speciality_name"
                        onChange={handleChangeSpeciality}
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
                    <label htmlFor="doctortId">Doctor</label>
                      <select
                        className="form-control text-capitalize speciality_name"
                        value={appointmentDetails.doctortId}
                        name="doctortId"
                        onChange={handleChangeDoctor}
                      >
                        <option value="">Choose a doctor</option>
                        {doctors.map((doctor) => (
                          <option key={doctor.doctortId} value={doctor.doctortId}>
                            {doctor.name}
                          </option>
                        ))}
                      </select>
                    </div>
                   </div>
                </div>

                {/* symptom block */}
                <div className="line-2">
                  <hr></hr>
                </div>
                <div>
                  <h5>Symptom</h5>
                  {renderSymptom()}
                  <div className="row">
                  <div class="col s12 m6 l4">
                    <div className="form-group">
                      <div className="input-field">
                        <label htmlFor="name">Name</label>
                        <input
                          className="name"
                          id="exampleInputname1"
                          placeholder="name"
                          onChange={handleChangeSymptom}
                          value={symptom.name}
                          name="name"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col s12 m6 l4">
                    <div className="form-group">
                      <div className="input-field">
                        <label htmlFor="fromWhen">From when</label>
                        <input
                          className="fromWhen"
                          id="exampleInputfromWhen1"
                          placeholder="fromWhen"
                          onChange={handleChangeSymptom}
                          value={symptom.fromWhen}
                          name="fromWhen"
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
                        onClick={() => handleAddSymptom()}
                        ></i>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>

                {/* PreviousMedicine block */}
                <div className="line-2">
                  <hr></hr>
                </div>
                <div>
                  <h5>Previous Medicine</h5>(if any)
                  {renderPreviousMedicine()}
                  <div className="row">
                  <div class="col s12 m6 l4">
                    <div className="form-group">
                      <div className="input-field">
                        <label htmlFor="name">Name</label>
                        <input
                          className="name"
                          id="exampleInputname1"
                          placeholder="name"
                          onChange={handleChangePreviousMed}
                          value={previousMed.name}
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
                          onChange={handleChangePreviousMed}
                          value={previousMed.dose}
                          name="dose"
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
                        onClick={() => handleAddPreviousMedicine()}
                        ></i>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>

                {/* previousTestReport block */}
                <div className="line-2">
                  <hr></hr>
                </div>
                <div>
                  <h5>Previous Test Report</h5>(if any)
                  {renderPreviousTestReport()}
                  <div className="row">
                  <div class="col s12 m6 l4">
                    <div className="form-group">
                      <div className="input-field">
                        <label htmlFor="link">link</label>
                        <input
                          className="link"
                          id="exampleInputlink1"
                          placeholder="link"
                          onChange={handleChangePreviousTestReport}
                          value={previousTestReport.link}
                          name="link"
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
                        onClick={() => handleAddPreviousTestReport()}
                        ></i>
                      </div>
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

export default Create_appointment;
