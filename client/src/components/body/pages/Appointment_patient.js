import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Chat_Component from "../chat_Component/Chat_Component.js";
import axios from "axios";
import "./get.css";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import SideNav from "../profile/sidenav/SideNav";
import Pdf from "react-to-pdf";
import "./prescription.css";

const ref = React.createRef();
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

const Appointment_patient = () => {
  const [appointment, setAppointment] = useState(initialState);
  const [testReports, setTestReports] = useState([]);
  const [link, setLink] = useState("");
  const [callback, setCallback] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const token = useSelector((state) => state.token);
  const { user } = useSelector((state) => state.auth);
  const auth = useSelector((state) => state.auth);
  const { isLogged, isAdmin, isDoctor } = auth;

  const { caseId } = useParams();

  // data fetching
  useEffect(async () => {
    try {
      window.scrollTo({ top: 0 });
      const res = await axios.get("/appointments/fetchAppointment/" + caseId, {
        headers: { Authorization: token },
      });
      setAppointment(res.data);
      setTestReports(res.data.testReports);
      setMedicines(res.data.medicines);
    } catch (err) {
      console.log(err);
    }
  }, [callback, user, token, caseId]);

  // handle changes
  const handleChangeLink = (e) => {
    const { name, value } = e.target;
    setLink(value);
  };

  // handle submit
  const handleUploadTestReport = async (testReports) => {
    if (link === "") {
      alert("Re-enter the report link");
    } else {
      try {
        await axios.post(
          "/appointments/addTestReports",
          {
            caseId: appointment._id,
            testReports: testReports,
          },
          { headers: { Authorization: token } }
        );
        setLink("");
        setCallback(!callback);
        alert("Test report uploaded");
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

  const renderTestReport = () => {
    if (testReports.length === 0) return "";
    return (
      <div>
        <h5>Upload Test Report</h5>
        <div className="col-right">
          <div style={{ overflowX: "auto" }}>
            <table className="medical">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Link</th>
                  <th>Upload</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                {testReports.map((testReport) => (
                  <tr key={testReport._id}>
                    <td>{testReport.name}</td>
                    <td>
                      {" "}
                      <input
                        className="link"
                        id="exampleInputLink1"
                        placeholder="link"
                        onChange={handleChangeLink}
                        name="link"
                      />
                    </td>
                    <td>
                      <i
                        className="fas fa-angle-double-up"
                        title="upload"
                        onClick={() =>
                          handleUploadTestReport({
                            name: testReport.name,
                            link: link,
                          })
                        }
                      >
                        {" "}
                      </i>
                    </td>
                    <td>
                      <a href={testReport.link}>
                        <i className="fa fa-download" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <hr></hr>
        <br></br>
      </div>
    );
  };

  const renderTestReportPdf = () => {
    if (testReports.length === 0) return "";
    return (
      <div>
        {/* <h5>Upload Test Report</h5> */}
        <div className="col-right">
          <div style={{ overflowX: "auto" }}>
            <table className="pdf_app">
              <thead>
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {testReports.map((testReport) => (
                  <tr key={testReport._id}>
                    <td>• {testReport.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <hr></hr>
        <br></br>
      </div>
    );
  };

  const renderMedicine = () => {
    if (medicines.length === 0) return "";
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
              {medicines.map((med) => (
                <tr key={med.name}>
                  <td>{med.name}</td>
                  <td>{med.dose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderMedicinePdf = () => {
    if (medicines.length === 0) return "";
    return (
      <div className="col-right">
        <div style={{ overflowX: "auto" }}>
          <table className="pdf_app">
            <thead>
              <tr>
                <th>Name</th>
                <th>Dose</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((med) => (
                <tr key={med.name}>
                  <td>• {med.name}</td>
                  <td>{med.dose}</td>
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
              <h6>{appointment.description}</h6>
            </p>
            <div>
              <h5>
                Meeting Detail -&nbsp;
                {new Date(appointment.meetingDetail).toDateString()} at &nbsp;
                {new Date(appointment.meetingDetail).toLocaleTimeString()}
              </h5>
            </div>
            <div>
              <h5> Doctor's Name - {appointment.doctor_name}</h5>
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
            <br></br>

            {/* Test Report */}
            {appointment.mode === "online" ? (
              <div>
                <div>
                  <h5>Test Reports</h5>
                  {renderTestReport()}
                </div>
              </div>
            ) : (
              ""
            )}

            {/* Medicine */}
            {appointment.mode === "online" ? (
              <div>
                <div>
                  <h5>Medicines</h5>
                  {renderMedicine()}
                </div>
              </div>
            ) : (
              ""
            )}
 <hr></hr>
            <br></br>

            {/* Doctors remark */}
            <div>
              <h5>
                {" "}
                {appointment.doctorsNote.length === 0
                  ? ""
                  : "Doctor's remark - " + appointment.doctorsNote}
              </h5>
            </div>
            <hr></hr>
            <br></br>


            {/* download prescription */}
            <div className="pdf_prescription">
              {appointment.mode === "online" ? (
                <>
                  <p>
                    <button
                      class="button"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseExample"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      Prescription
                    </button>
                  </p>
                  <div class="collapse" id="collapseExample">
                    <div class="card card-body">
                      {/* <PDF_Prescription appointment={appointment} /> */}
                      <>
                        <div className="Post" ref={ref}>
                          <div class="container">
                            <header class="row">
                              <div class="header">
                                <div class="logo">
                                  <h2>
                                    <strong>Medicaid+</strong>
                                  </h2>
                                </div>
                              </div>
                              <div class="col">
                                <div class="doc-details">
                                  <p class="doc-name">
                                    {appointment.doctor_name}
                                  </p>
                                </div>

                                <div class="clinic-details">
                                  <p>{appointment.clinic_address}</p>
                                </div>
                              </div>
                              <div class="col-4 datetime">
                                <p>
                                  Date:{" "}
                                  {new Date(
                                    appointment.meetingDetail
                                  ).toLocaleDateString()}
                                </p>
                                <p>
                                  Time:{" "}
                                  {new Date(
                                    appointment.meetingDetail
                                  ).toLocaleTimeString()}
                                </p>
                              </div>
                            </header>

                            <div class="prescription">
                              <h3>
                                Patient Name : Rx {appointment.patient_name}
                              </h3>

                              {/* Medicine */}
                              <div>
                                <div>
                                  <h5>Medicines</h5>
                                  {renderMedicinePdf()}
                                </div>
                              </div>

                              {/* Test Report */}

                              <div>
                                <div>
                                  <h5>Test Report</h5>
                                  {renderTestReportPdf()}
                                </div>
                              </div>

                              <div>
              <h5>
               
                {appointment.doctorsNote.length === 0
                  ? ""
                  : "Doctor's remark - " + appointment.doctorsNote}
              </h5>
            </div>
            <hr></hr>

                             
                              <div className="pdf_footer">
                                <p>Medicad+</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Pdf targetRef={ref} filename="post.pdf">
                          {({ toPdf }) => (
                            <button className="pdf_button" onClick={toPdf}>
                              Capture as PDF
                            </button>
                          )}
                        </Pdf>
                      </>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p>
                    <button
                      class="button"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseExample"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      Appointment Slip
                    </button>
                  </p>
                  <div class="collapse" id="collapseExample">
                    <div class="card card-body">
                      {/* <PDF_Prescription appointment={appointment} /> */}
                      <>
                        <div className="Post" ref={ref}>
                          <div class="container offline_con">
                            <header class="row">
                              <div class="header">
                                <div class="logo">
                                  <h2>
                                    <strong>Medicaid+</strong>
                                  </h2>
                                </div>
                              </div>
                              <div class="col">
                                <div class="doc-details">
                                  <p class="doc-name">
                                    {appointment.doctor_name}
                                  </p>
                                </div>

                                <div class="clinic-details">
                                  <p>{appointment.clinic_address}</p>
                                </div>
                              </div>
                              <div class="col-4 datetime">
                                <p>
                                  Date:{" "}
                                  {new Date(
                                    appointment.meetingDetail
                                  ).toLocaleDateString()}
                                </p>
                                <p>
                                  Time:{" "}
                                  {new Date(
                                    appointment.meetingDetail
                                  ).toLocaleTimeString()}
                                </p>
                              </div>
                            </header>

                            <div class="prescription">
                              <h3>
                                Patient Name : Rx {appointment.patient_name}
                              </h3>

                              <div className="pdf_empty_footer">
                                <p>Medicad+</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Pdf targetRef={ref} filename="post.pdf">
                          {({ toPdf }) => (
                            <button className="pdf_button" onClick={toPdf}>
                              Capture as PDF
                            </button>
                          )}
                        </Pdf>
                      </>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <Chat_Component appointment={appointment} />
      </div>
    </>
  );
};

export default Appointment_patient;
