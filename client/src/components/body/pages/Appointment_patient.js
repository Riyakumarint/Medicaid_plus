import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import './get.css'
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import SideNav from "../profile/sidenav/SideNav";

const initialState = {
  _id: "",
  patienttId: "",
  doctortId: "",
  status: "",
  date: "",

  title: "",
  description: "",
  symptoms: [],
  previousMedicine: [],
  previousTestReports: [],

  meetingDetail: "",

  medicines: [],
  testReports: [],
  doctorsNote: "",
  doctorsNotePrivate: "",
  prescription: "",

  err: "",
  success: "",
};

const Appointment_patient = () => {

  const [appointment, setAppointment] = useState(initialState);
  const [testReports, setTestReports] = useState([]);
  const [callback, setCallback] = useState(false);

  const token = useSelector((state) => state.token);
  const {user} = useSelector((state) => state.auth);
  const auth = useSelector((state) => state.auth);
  const { isLogged, isAdmin, isDoctor} = auth;

  const {caseId} = useParams();

  // data fetching
  useEffect(async () => {
    try {
        const res = await axios.get(
          "/appointments/fetchAppointment/"+caseId,
          { headers: { Authorization: token } }
        );
        setAppointment(res.data);
        setTestReports(res.data.testReports);

      } catch (err) {
        console.log(err);
      }
  }, [callback]);

  // handle changes


  // handle submit
  const handleUploadTestReport = async () => {
    try {
      console.log("uploading");
    } catch (err) {
        console.log(err);
    }
  };

  // renders
  const renderSymptom = () =>{
    if(appointment.symptoms.length===0) return ('None');
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
    )
  };

  const renderPreviousMedicine = () =>{
    if(appointment.previousMedicine.length===0) return ('None');
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
    )
  };

  const renderPreviousTestReport = () =>{
    if(appointment.previousTestReports.length===0) return ('None');
    return (
      <div className="col-right">
      <div style={{ overflowX: "auto" }}>
          <table className="medical">
            <thead>
              <tr>
                <th>link</th>
              </tr>
            </thead>
            <tbody>
              {appointment.previousTestReports.map((previousTestReport) => (
                <tr key={previousTestReport.link}>
                  <td>{previousTestReport.link}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
      </div>
    )
  };

  const renderTestReport = () =>{
    if(testReports.length===0) return ('');
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
                <tr key={testReport._id}>
                  <td>{testReport.name}</td>
                  <td> attach file </td>
                  <td>
                    <i className="fas fa-angle-double-up"
                      title="upload"
                      onClick={() => handleUploadTestReport()}
                    > Upload</i>
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
          {appointment.err && showErrMsg(appointment.err)}
          {appointment.success && showSuccessMsg(appointment.success)}

          <div className="profile_page">
            <div className="profile_header">
              <h3> {appointment.title}</h3>
              <p>{appointment.status}</p>
            </div>
            <p><h6>{appointment.description}</h6></p>
            <div >
              <h5> Meeting Detail - {appointment.meetingDetail.substring(0, 21)}</h5>
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
            <br></br>

            {/* Test Report */}
            <div>
              <h5>Test Report</h5>
              {renderTestReport()}
            </div>
            <hr></hr>
            <br></br>

            {/* Doctors remark */}
            <div >
              <h5> {appointment.doctorsNote.length === 0? "": "Doctor's remark - "+appointment.doctorsNote}</h5>
            </div>
            <br></br>

            {/* download prescription */}
            <div>
              <button
                  type="button"
                  className="button"
                  // onClick={() => window.scrollTo({ top: 0 })}
                  >
                  Download prescription
                </button>
            </div>


          </div>
        </div>
      </div>
    </>
  );
};

export default Appointment_patient;
