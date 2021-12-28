import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Chat_Component from "../chat_Component/Chat_Component.js";
import axios from "axios";
import "./get.css";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import SideNav from "../profile/sidenav/SideNav";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const initialState = {
  _id: "",
  patienttId: "",
  doctortId: "",
  patient_name: "",
  doctor_name: "",
  status: "",
  mode: "online",
  clinic_address: "",
  title: "",
  description: "",
  meetingDetail: "",
  symptoms: [],
  previousMedicine: [],
  previousTestReports: [],
  medicines: [],
  testReports: [],
  doctorsNote: "",
  doctorsNotePrivate: "",
  prescription: "",
  err: "",
  success: "",
};

const Appointment_doctor = () => {
  const [appointment, setAppointment] = useState(initialState);
  const [patientUser, setPatientUser] = useState({
    name:"", avatar:"", email:"", mobile:"", gender:""
  });
  const [med, setMed] = useState({ name: "", dose: "" });
  const [medicine, setMedicine] = useState([]);
  const [testReport, setTestReport] = useState({ name: "", link: "" });
  const [testReports, setTestReports] = useState([]);
  const [callback, setCallback] = useState(false);
  const [newdate, setNewDate] = useState(null);
  const [date, setDate] = useState(null);
  const token = useSelector((state) => state.token);
  const { user } = useSelector((state) => state.auth);
  const auth = useSelector((state) => state.auth);
  const { isLogged, isAdmin, isDoctor } = auth;
  const history = useHistory();
  const { caseId } = useParams();

  // data fetching
  useEffect(async () => {
    try {
      window.scrollTo({ top: 0 });
      const res = await axios.get("/appointments/fetchAppointment/" + caseId, {
        headers: { Authorization: token },
      });
      setAppointment(res.data);
      setMedicine(res.data.medicines);
      setTestReports(res.data.testReports);
    } catch (err) {
      console.log(err);
    }
  }, [callback, user, token, caseId]);

  useEffect(() => {
    const getPatientUser = async () => {
      try {
        const res = await axios.get("/user/fetchUser/" + appointment.patienttId);
        setPatientUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPatientUser();
  }, [callback,appointment]);

  // handle changes
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value, err: "", success: "" });
  };

  const handleChangeMed = (e) => {
    const { name, value } = e.target;
    setMed({ ...med, [name]: value });
  };

  const handleChangeTestReport = (e) => {
    const { name, value } = e.target;
    setTestReport({ ...testReport, [name]: value });
  };

  // handle submit
  const handleSave = async () => {
    try {
      await axios.post(
        "/appointments/updateDoctorsNote",
        {
          caseId: appointment._id,
          doctorsNote: appointment.doctorsNote,
          doctorsNotePrivate: appointment.doctorsNotePrivate,
        },
        { headers: { Authorization: token } }
      );

      await axios.post(
        "/appointments/addMedicines",
        {
          caseId: appointment._id,
          medicines: medicine,
        },
        { headers: { Authorization: token } }
      );

      await axios.post(
        "/appointments/addTestReports",
        {
          caseId: appointment._id,
          testReports: testReports,
        },
        { headers: { Authorization: token } }
      );

      setAppointment({ ...appointment, err: "", success: "Updated Success!" });
    } catch (err) {
      setAppointment({
        ...appointment,
        err: err.response.data.msg,
        success: "",
      });
    }
  };
  const handleChangeStatus = async () => {
    try {
      await axios.post(
        "/appointments/updateStatus",
        {
          caseId: appointment._id,
          status: appointment.status === "active" ? "closed" : "active",
        },
        { headers: { Authorization: token } }
      );
      window.scrollTo({ top: 0 });
      setAppointment({
        ...appointment,
        status: appointment.status === "active" ? "closed" : "active",
        err: "",
        success: appointment.status === "active" ? "Case Closed" : "Case Open",
      });
    } catch (err) {
      setAppointment({
        ...appointment,
        err: err.response.data.msg,
        success: "",
      });
    }
  };

  const handleAddMedicine = async () => {
    try {
      setMedicine([...medicine, med]);
      setMed({ name: "", dose: "" });
    } catch (err) {
      setMed({ ...med });
    }
  };
  const handleDeleteMedicine = async (medName) => {
    try {
      const newMedicine = medicine.filter((med) => {
        return med.name !== medName;
      });
      setMedicine(newMedicine);
      setMed({ name: "", dose: "" });
    } catch (err) {
      setMed({ ...med });
    }
  };

  const handleAddTestReport = async () => {
    try {
      setTestReports([...testReports, testReport]);
      setTestReport({ name: "", link: "" });
    } catch (err) {
      setTestReport({ ...testReport });
    }
  };
  const handleDeleteTestReport = async (reportName) => {
    try {
      const newTestReport = testReports.filter((testReport) => {
        return testReport.name !== reportName;
      });
      setTestReports(newTestReport);
      setTestReport({ name: "", link: "" });
    } catch (err) {
      setTestReport({ ...testReport });
    }
  };
  const handleReshedule = async () => {
    if (newdate === null) {
      alert("Enter a slot");
    } else {
      try {
        window.scrollTo({ top: 0 });
        const temp = await axios.post(
          "/appointments/resheduleAppointment/" +
            appointment._id +
            "/" +
          newdate, {
            prevDate: appointment.meetingDetail,
            doctorName: appointment.doctor_name,
            patientName: appointment.patient_name,
            patientEmail: patientUser.email,
            }
        );
        setNewDate();
        console.log("emailend")
        setCallback(!callback);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // renders
  const renderSymptom = () => {
    if (appointment.symptoms.length === 0) return "None";
    return (
      <div className="col-right">
        <div style={{ overflowX: "auto" }}>
          <table className="medical">
            <thead>
              <tr>
                <th>Name</th>
                <th>From when</th>
              </tr>
            </thead>
            <tbody>
              {appointment.symptoms.map((symptom) => (
                <tr key={symptom.name}>
                  <td>{symptom.name}</td>
                  <td>{symptom.fromWhen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderPreviousMedicine = () => {
    if (appointment.previousMedicine.length === 0) return "None";
    return (
      <div className="col-right">
        <div style={{ overflowX: "auto" }}>
          <table className="medical">
            <thead>
              <tr>
                <th>Name</th>
                <th>Dose</th>
              </tr>
            </thead>
            <tbody>
              {appointment.previousMedicine.map((previousMed) => (
                <tr key={previousMed.name}>
                  <td>{previousMed.name}</td>
                  <td>{previousMed.dose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderPreviousTestReport = () => {
    if (appointment.previousTestReports.length === 0) return "None";
    return (
      <div className="col-right">
        <div style={{ overflowX: "auto" }}>
          <table className="medical">
            <thead>
              <tr>
                <th>Link</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {appointment.previousTestReports.map((previousTestReport) => (
                <tr key={previousTestReport.link}>
                  <td>{"Report"}</td>
                  <td>
                    <a href={previousTestReport.link}>
                      <i className="fa fa-download" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderMedicine = () => {
    if (medicine.length === 0) return "";
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
              {medicine.map((med) => (
                <tr key={med.name}>
                  <td>{med.name}</td>
                  <td>{med.dose}</td>
                  <td>
                    <i
                      className="fas fa-trash-alt"
                      title="Remove"
                      onClick={() => handleDeleteMedicine(med.name)}
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

  const renderTestReport = () => {
    if (testReports.length === 0) return "";
    return (
      <div className="col-right">
        <div style={{ overflowX: "auto" }}>
          <table className="medical">
            <thead>
              <tr>
                <th>Name</th>
                <th>Link</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {testReports.map((testReport) => (
                <tr key={testReport.name}>
                  <td>{testReport.name}</td>
                  <td>
                    <a href={testReport.link}>
                      <i className="fa fa-download" />
                    </a>
                  </td>
                  <td>
                    <i
                      className="fas fa-trash-alt"
                      title="Remove"
                      onClick={() => handleDeleteTestReport(testReport.name)}
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
          {appointment.err && showErrMsg(appointment.err)}
          {appointment.success && showSuccessMsg(appointment.success)}

          <div className="profile_page">
            <div className="profile_header">
              <h3> {appointment.title}</h3>
              <p>{appointment.status}</p>
            </div>
            <p>
              <h6>Description : {appointment.description}</h6>
            </p>
            <div>
              <h5>
                Meeting Detail -&nbsp;
                           {new Date(appointment.meetingDetail).toDateString()} at &nbsp;
                {new Date(appointment.meetingDetail).toLocaleTimeString()}
              </h5>
            </div>
            <div>
              <h5> Patient's Name - {appointment.patient_name}</h5>
            </div>
            <div>
              <h5>
                {"Clinic Address - " +
                  appointment.clinic_address +
                  " (" +
                  appointment.mode +
                  ")"}
              </h5>
            </div>
            <hr></hr>
            <br></br>
            {/* symptoms */}
            <div>
              <h5>Symptoms</h5>
              {renderSymptom()}
            </div>
            <hr></hr>

            {/* Previous medicine */}
            <div>
              <h5>Previous Medicine</h5>
              {renderPreviousMedicine()}
            </div>
            <hr></hr>

            {/* Previous Test Report */}
            <div>
              <h5>Previous Test Report</h5>
              {renderPreviousTestReport()}
            </div>
            <hr></hr>

            {/* view medical history of patient */}
            <div>
              <button
                type="button"
                className="button"
                onClick={() => window.scrollTo({ top: 0 })}
              >
                <Link to={`/medicalhistory/${appointment.patienttId}`}>
                  View patient medical history
                </Link>
              </button>
            </div>

            {/* add medicines */}
            <div className="line-2">
              <hr></hr>
            </div>
            <div>
              <h5>Medicine</h5>
              {renderMedicine()}
              <div className="row">
                <div class="col s12 m6 l4">
                  <div className="form-group">
                    <div className="input-field">
                      <label htmlFor="name">Name</label>
                      <input
                        className="name"
                        id="exampleInputname1"
                        placeholder="name"
                        onChange={handleChangeMed}
                        value={med.name}
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
                        onChange={handleChangeMed}
                        value={med.dose}
                        name="dose"
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
                        onClick={() => handleAddMedicine()}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* add tests reports */}
            <div className="line-2">
              <br></br>
            </div>
            <div>
              <h5>Test Report</h5>
              {renderTestReport()}
              <div className="row">
                <div class="col s12 m6 l4">
                  <div className="form-group">
                    <div className="input-field">
                      <label htmlFor="name">Name</label>
                      <input
                        className="name"
                        id="exampleInputname1"
                        placeholder="name"
                        onChange={handleChangeTestReport}
                        value={testReport.name}
                        name="name"
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
                        onClick={() => handleAddTestReport()}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="line-2">
              <br></br>
            </div>

            {/* doctors note */}
            <div className="row">
              <div class="col s12 m6 l4">
                <div className="form-group">
                  <div className="input-field">
                    <label htmlFor="doctorsNote">
                      <h5>Doctors Note</h5>
                    </label>
                    <textarea
                      rows="3"
                      cols="30"
                      type="doctorsNote"
                      className="appointment_description"
                      id="exampleDoctorsNote"
                      aria-describedby="doctorsNote"
                      placeholder="Doctors Note"
                      onChange={handleChangeInput}
                      name="doctorsNote"
                      value={appointment.doctorsNote}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* doctors private note */}
            <div className="row">
              <div class="col s12 m6 l4">
                <div className="form-group">
                  <div className="input-field">
                    <label htmlFor="doctorsNotePrivate">
                      <h5>Private Note</h5>
                    </label>
                    <textarea
                      rows="3"
                      cols="30"
                      type="doctorsNotePrivate"
                      className="appointment_description"
                      id="exampleDoctorsNote"
                      aria-describedby="doctorsNote"
                      placeholder="Private Note"
                      onChange={handleChangeInput}
                      name="doctorsNotePrivate"
                      value={appointment.doctorsNotePrivate}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button
                type="button"
                className="blog_post_btn"
                onClick={() => handleSave()}
              >
                save
              </button>
            </div>
            <hr></hr>

            {/* Change meeting detail */}
            <div>
              <DatePicker
                selected={newdate}
                minDate={new Date()}
                onChange={(date) => setNewDate(date)}
                showTimeSelect
                dateFormat="Pp"
              />
              <button className="button" onClick={handleReshedule}>
                Reshedule
              </button>
            </div>

            {/* Change status */}
            <div>
              <button
                type="button"
                className="button"
                onClick={() => handleChangeStatus()}
              >
                {appointment.status === "active" ? "Close case" : "Open case"}
              </button>
            </div>
          </div>
        </div>
        <Chat_Component appointment={appointment} />
      </div>
    </>
  );
};

export default Appointment_doctor;
