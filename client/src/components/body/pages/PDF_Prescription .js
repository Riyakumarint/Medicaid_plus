import React from "react";
import Pdf from "react-to-pdf";
import "./prescription.css";
const ref = React.createRef();

const PDF_Prescription = ({ appointment }) => {
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
    );
  };

  //   c

  return (
    <>
      <div className="Post" ref={ref}>
        {/* <p>Doctors Note : {appointment.doctorsNote}</p>

        <p>Private Note : {appointment.doctorsNotePrivate}</p>

        <p>
          Meeting Detail : {new Date(appointment.meetingDetail).toDateString()}
        </p> */}

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
                <p class="doc-name">{appointment.doctor_name}</p>
              </div>

              <div class="clinic-details">
                <p>{appointment.clinic_address}</p>
              </div>
            </div>
            <div class="col-4 datetime">
              <p>Date: {new Date().toLocaleDateString()}</p>
              <p>Time: {new Date().toLocaleTimeString()}</p>
              <p>
                Meeting Detail:{" "}
                {new Date(appointment.meetingDetail).toDateString()}
              </p>
            </div>
          </header>
          <div class="prescription">
            <p>Patient Name : Rx {appointment.patient_name}</p>
            <table>
              <tr>
                <th></th>
                <th>Type</th>
                <th>Name of the drug</th>
                <th>Dosage</th>
                <th>Frequency</th>
                <th>Period</th>
              </tr>
              <tr>
                <td>1.</td>
                <td>Tablet</td>
                <td>Brufen Brufen Brufen</td>
                <td>400 mg</td>
                <td>1 - 0 - 1</td>
                <td>10 days</td>
              </tr>
              <tr>
                <td>2.</td>
                <td>Lotion</td>
                <td>Brufen</td>
                <td>400 mg</td>
                <td>1 - 0 - 1</td>
                <td>10 days</td>
              </tr>

              <tr>
                <td>3.</td>
                <td>Syrub</td>
                <td>Brufen</td>
                <td>400 mg</td>
                <td>1 - 0 - 1</td>
                <td>10 days</td>
              </tr>

              <tr>
                <td colspan="5">
                  <p>Before food (Don’t take the tab, I say)</p>
                </td>
              </tr>
              <tr>
                <td>4.</td>
                <td>Oil</td>
                <td>Brufen</td>
                <td>400 mg</td>
                <td>1 - 0 - 1</td>
                <td>10 days</td>
              </tr>
            </table>
          </div>
          <p>Doctors Note : {appointment.doctorsNote}</p>

          <p>Private Note : {appointment.doctorsNotePrivate}</p>

          <p>Medicad+</p>
        </div>
      </div>
      <Pdf targetRef={ref} filename="post.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Capture as PDF</button>}
      </Pdf>
    </>
  );
};

export default PDF_Prescription;
