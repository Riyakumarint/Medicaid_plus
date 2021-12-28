import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import SideNav from "../profile/sidenav/SideNav";
import Loading from "../../utils/notification/Loading";
import Book_Slots from "../book_Slots/Book_Slots";
import StripeCheckout from "react-stripe-checkout";
const initialState = {
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

  err: "",
  success: "",
};

const initialState2 = {
  doctortId: "",
  doctor_name: "",
  clinic_address: "",
  speciality_name: "",
};

const Create_appointment = () => {
  const [appointmentDetails, setAppointmentDetails] = useState(initialState);
  const [pdfFile, setPdfFile] = useState(false);
  const [symptom, setSymptom] = useState({ name: "", fromWhen: "" });
  const [symptoms, setSymptoms] = useState([]);
  const [previousMed, setPreviousMed] = useState({ name: "", dose: "" });
  const [previousMedicine, setPreviousMedicine] = useState([]);
  const [previousTestReport, setPreviousTestReport] = useState({ link: "" });
  const [previousTestReports, setPreviousTestReports] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [speciality, setSpeciality] = useState({
    speciality_name: "",
    fee: "",
  });
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState({ city_name: "" });
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState(initialState2);
  const [callback, setCallback] = useState(false);
  const history = useHistory();
  const [date, setDate] = useState({ date: "", slotId: "" });
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.token);
  const { user } = useSelector((state) => state.auth);
  const [success, setSuccess] = useState(false);
  const [showItem, setShowItem] = useState(false);
  const [payment, setPayment] = useState({
    name: user.name,
    fee: speciality.fee,
  });
  // data fetching
  useEffect(() => {
    window.scrollTo({ top: 0 });
    const getSpecialities = async () => {
      const res = await axios.get("/api/speciality");
      setSpecialities(res.data);
    };
    getSpecialities();
  }, [callback]);
  useEffect(() => {
    const getCities = async () => {
      const res = await axios.get("/api/city");
      setCities(res.data);
    };
    getCities();
  }, [callback]);

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const res = await axios.post(
          "/api/fetchDoctors/",
          { speciality_name: "", city_name: "" },
          { headers: { Authorization: token } }
        );
        setDoctors(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getDoctors();
  }, [callback, token]);

  // handle changes
  // const handleChangePdf = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const file = e.target.files[0];

  //     if (!file)
  //       return setAppointmentDetails({
  //         ...appointmentDetails,
  //         err: "No files were uploaded.",
  //         success: "",
  //       });

  //     if (file.size > 2048 * 2048)
  //       return setAppointmentDetails({
  //         ...appointmentDetails,
  //         err: "Size too large.",
  //         success: "",
  //       });

  //     if (file.type !== "application/pdf")
  //       return setAppointmentDetails({
  //         ...appointmentDetails,
  //         err: "File format is incorrect.",
  //         success: "",
  //       });

  //     let formData = new FormData();
  //     formData.append("file", file);

  //     setLoading(true);
  //     const res = await axios.post("/api/upload_pdf", formData, {
  //       headers: {
  //         // "content-type": "multipart/form-data",
  //         "content-type": "text/plain",

  //         Authorization: token,
  //       },
  //     });

  //     setLoading(false);
  //     setPdfFile(res.data.url);
  //   } catch (err) {
  //     setAppointmentDetails({
  //       ...appointmentDetails,
  //       err: err.response.data.msg,
  //       success: "",
  //     });
  //   }
  // };

  const handleChangeInput = async (e) => {
    const { name, value } = e.target;
    setAppointmentDetails({
      ...appointmentDetails,
      [name]: value,
      err: "",
      success: "",
    });
    if (name === "mode" && value === "online") {
      handleChangeCity({ target: { name: "city_name", value: "" } });
    }
  };

  const handleChangeSpeciality = async (e) => {
    const { name, value } = e.target;
    setSpeciality({ ...speciality, [name]: value });
    setDoctor(initialState2);

    try {
      const res = await axios.post(
        "/api/fetchDoctors/",
        { speciality_name: e.target.value, city_name: city.city_name },
        { headers: { Authorization: token } }
      );
      setDoctors(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleChangeCity = async (e) => {
    const { name, value } = e.target;
    setCity({ ...city, [name]: value });
    setDoctor(initialState2);

    try {
      const res = await axios.post(
        "/api/fetchDoctors/",
        {
          speciality_name: speciality.speciality_name,
          city_name: e.target.value,
        },
        { headers: { Authorization: token } }
      );

      setDoctors(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeDoctor = (e) => {
    const { name1, value } = e.target;
    const temp = doctors.filter((doctor) => {
      return doctor.userId === value;
    });
    if (Lenght(temp) === 0) {
      setDoctor(initialState2);
    } else {
      const { userId, name, clinic_address, speciality_name } = temp[0];
      setDoctor({
        ...doctor,
        doctortId: userId,
        doctor_name: name,
        clinic_address: clinic_address,
        speciality_name,
        speciality_name,
      });
    }
  };
  const handleChangeSymptom = (e) => {
    const { name, value } = e.target;
    setSymptom({ ...symptom, [name]: value });
  };

  const handleChangePreviousMed = (e) => {
    const { name, value } = e.target;
    setPreviousMed({ ...previousMed, [name]: value });
  };

  const handleChangePreviousTestReport = (e) => {
    const { name, value } = e.target;
    setPreviousTestReport({ ...previousTestReport, [name]: value });
  };

  const makePayment = (token) => {
    const body = {
      token,
      payment,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`http://localhost:5013/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("RESPONSE", response);
        const { status } = response;
        setSuccess(true);
        console.log("STATUS", status);
      })
      .catch((error) => console.log(error));
  };
  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !doctor.doctortId ||
      !appointmentDetails.title ||
      !appointmentDetails.description ||
      Lenght(symptoms) === 0 ||
      date.slotId === ""
    )
      return setAppointmentDetails({
        ...appointmentDetails,
        err: "Please fill in all fields.",
        success: "",
      });

    const appointmentDetail = {
      ...appointmentDetails,
      patienttId: user._id,
      patient_name: user.name,
      
      status: "active",
      doctortId: doctor.doctortId,
      doctor_name: doctor.doctor_name,
      clinic_address: doctor.clinic_address,
      symptoms: symptoms,
      previousMedicine: previousMedicine,
      previousTestReports: previousTestReports,
      meetingDetail: date.date,
      pdfFile: pdfFile,
      fee: speciality.fee,
      err: "",
      success: "",
    };
    // console.log(appointmentDetail);
    const convo = {
      senderId: user._id,
      receiverId: doctor.doctortId,
    };

    try {
      const Conversation = await axios.post("/conversations", convo);
      // console.log(Conversation);
    } catch (err) {
      console.log(err);
    }
    try {
      const res = await axios.post(
        "/slots/book/" + date.slotId + "/" + user._id,
        { patientName: user.name }
      );
    } catch (err) {
      console.log("heloo:   " + err);
    }
    try {
      if (!success) {
        return setAppointmentDetails({
          ...appointmentDetails,
          err: "Make Payment",
          success: "",
        });
      }
      const res = await axios.post(
        "/appointments/createAppointment",
        { appointmentDetail,patient_email: user.email },
        { headers: { Authorization: token } }
      );

      setAppointmentDetails({
        ...appointmentDetails,
        
        err: "",
        success: "Appointment Created Success!",
      });
      setTimeout(() => {
        history.push("/get_appointments");
      }, 2000);
    } catch (err) {
      setAppointmentDetails({
        ...appointmentDetails,
        err: err.response.data.msg,
        success: "",
      });
    }
  };

  const handleAddSymptom = async () => {
    try {
      setSymptoms([...symptoms, symptom]);
      setSymptom({ name: "", fromWhen: "" });
    } catch (err) {
      setSymptom({ ...symptom });
    }
  };
  const handleDeleteSymptom = async (symptomName) => {
    try {
      const newSymptoms = symptoms.filter((symptom) => {
        return symptom.name !== symptomName;
      });
      setSymptoms(newSymptoms);
      setSymptom({ name: "", fromWhen: "" });
    } catch (err) {
      setSymptom({ ...symptom });
    }
  };

  const handleAddPreviousMedicine = async () => {
    try {
      setPreviousMedicine([...previousMedicine, previousMed]);
      setPreviousMed({ name: "", dose: "" });
    } catch (err) {
      setPreviousMed({ ...previousMed });
    }
  };
  const handleDeletePreviousMedicine = async (previousMedName) => {
    try {
      const newPreviousMedicine = previousMedicine.filter((previousMed) => {
        return previousMed.name !== previousMedName;
      });
      setPreviousMedicine(newPreviousMedicine);
      setPreviousMed({ name: "", dose: "" });
    } catch (err) {
      setPreviousMed({ ...previousMed });
    }
  };

  const handleAddPreviousTestReport = async () => {
    try {
      setPreviousTestReports([...previousTestReports, previousTestReport]);
      setPreviousTestReport({ link: "" });
    } catch (err) {
      setPreviousTestReport({ ...previousTestReport });
    }
  };
  const handleDeletePreviousTestReport = async (previousReportLink) => {
    try {
      const newPreviousTestReport = previousTestReports.filter(
        (previousTestReport) => {
          return previousTestReport.link !== previousReportLink;
        }
      );
      setPreviousTestReports(newPreviousTestReport);
      setPreviousTestReport({ link: "" });
    } catch (err) {
      setPreviousTestReport({ ...previousTestReport });
    }
  };

  // renders
  const renderSymptom = () => {
    if (symptoms.length === 0) return "";
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
                    <i
                      className="fas fa-trash-alt"
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
    );
  };

  const renderPreviousMedicine = () => {
    if (previousMedicine.length === 0) return "";
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
                    <i
                      className="fas fa-trash-alt"
                      title="Remove"
                      onClick={() =>
                        handleDeletePreviousMedicine(previousMed.name)
                      }
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

  const renderPreviousTestReport = () => {
    if (previousTestReports.length === 0) return "";
    return (
      <div className="col-right">
        <div style={{ overflowX: "auto" }}>
          <table className="medical">
            <thead>
              <tr>
                <th>Link</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {previousTestReports.map((previousTestReport) => (
                <tr key={previousTestReport.link}>
                  <td>{previousTestReport.link}</td>
                  <td>
                    <i
                      className="fas fa-trash-alt"
                      title="Remove"
                      onClick={() =>
                        handleDeletePreviousTestReport(previousTestReport.link)
                      }
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
          {appointmentDetails.err && showErrMsg(appointmentDetails.err)}
          {appointmentDetails.success &&
            showSuccessMsg(appointmentDetails.success)}
          {loading && <Loading />}
          {/* <form onSubmit={handleSubmit}> */}
          <div className="profile_page">
            <div className="book_appointment">
              <h3>Book Appointment</h3>
            </div>

            <div className="profile-container">
              {/* title and description block */}
              <div className="row">
                <div class="col s12 m6 l4">
                  <div className="form-group">
                    <div className="input-field">
                      <label htmlFor="title">
                        <span class="required-field"></span>Title
                      </label>
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
                <div class="col s12 m6 l4">
                  <div className="form-group">
                    <div className="input-field">
                      <label htmlFor="description">
                        <span class="required-field"></span>Description
                      </label>
                      <textarea
                        rows="3"
                        cols="30"
                        type="description"
                        className="appointment_description"
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

              {/* Mode of appointment */}
              <div className="row">
                <div class="col s12 m6 l4">
                  <div className="form-group">
                    <div className="input-field">
                      <label htmlFor="mode">
                        <span class="required-field"></span>Mode of Appointment
                      </label>
                      <div className="Mode_of_Appointment">
                        <label for="online">Online</label>
                        <input
                          type="radio"
                          id="online"
                          onChange={handleChangeInput}
                          name="mode"
                          defaultChecked
                          value="online"
                          className="mode_o"
                        />
                        <label for="offline">Offline</label>
                        <input
                          type="radio"
                          id="offline"
                          onChange={handleChangeInput}
                          name="mode"
                          value="offline"
                          className="mode_o"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* {doctor.doctortId !== "" ? (
                    <div class="col s12 m6 l4">
                      <br />
                      <br />
                      <h6>
                        Consultant Fee - ₹
                        {getSpecialityFee(doctor.speciality_name, specialities)}
                        
                      </h6>
                    </div>
                  ) : (
                    ""
                  )} */}
              </div>

              {/* Selectdoctor block */}
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
                {appointmentDetails.mode === "offline" ? (
                  <div class="col s12 m6 l4">
                    <div className="form-group">
                      <label htmlFor="city_name">City</label>
                      <select
                        className="form-control text-capitalize speciality_name"
                        value={city.city_name}
                        name="city_name"
                        onChange={handleChangeCity}
                      >
                        <option value="">Choose a city</option>
                        {cities.map((city) => (
                          <option key={city._id} value={city._id}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div class="col s12 m6 l4">
                  <div className="form-group">
                    <label htmlFor="doctortId">
                      <span class="required-field"></span>Doctor
                    </label>
                    <select
                      className="form-control text-capitalize speciality_name"
                      value={doctor.doctortId}
                      name="doctortId"
                      onChange={handleChangeDoctor}
                    >
                      <option value="">Choose a doctor</option>
                      {doctors.map((doctor) => (
                        <option key={doctor.userId} value={doctor.userId}>
                          {doctor.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div class="col s12 m6 l4">
                  <div className="form-group">
                    {console.log("jijiji :: " + date)}
                    {doctor !== initialState2 ? (
                      <>
                        <Book_Slots doctor={doctor} setDate={setDate} />
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>

              {/* symptom block */}
              <div className="line-2">
                <hr></hr>
              </div>
              <div>
                <h5>
                  <span class="required-field"></span>Symptom
                </h5>
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
                  <div>
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
                  <div>
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
                  <div>
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
            {doctor.doctortId !== "" &&
            appointmentDetails.title !== "" &&
            appointmentDetails.description !== "" &&
            Lenght(symptoms) !== 0 &&
            date.slotId !== "" ? (
              <>
                {!success ? (
                  <StripeCheckout
                    stripeKey="pk_test_51HQTH8J8AwZ227xYwVHlWH1ysskV58ngCxoIRrJiw9cdcfhzo0MZhUdikO4YinRuIypDCQRFikQNDvNwhOiVKjN400Yvu6iafA"
                    // {process.env.REACT_APP_KEY}
                    token={makePayment}
                    name="Make Payment"
                    amount={
                      getSpecialityFee(doctor.speciality_name, specialities) *
                      100
                    }
                  >
                    <button className="blog_post_btn mt-3 d-block mx-auto">
                      Make Payment ₹
                      {getSpecialityFee(doctor.speciality_name, specialities)}
                    </button>
                  </StripeCheckout>
                ) : (
                  <button
                    type="submit"
                    className="blog_post_btn mt-3 d-block mx-auto"
                    onClick={handleSubmit}
                  >
                    Book
                  </button>
                )}
              </>
            ) : (
              <div className="fill_all_btn mt-3 d-block mx-auto">
                Fill all the required fields
              </div>
            )}
          </div>
          {/* </form> */}
        </div>
      </div>
    </>
  );
};

const Lenght = (symptoms) => symptoms.length;
const getSpecialityName = (_id, specialities) => {
  const spec = specialities.filter((speciality) => {
    return speciality._id === _id;
  });
  if (Lenght(spec) === 0) return "";
  return spec[0].name;
};
const getSpecialityFee = (_id, specialities) => {
  const spec = specialities.filter((speciality) => {
    return speciality._id === _id;
  });
  if (Lenght(spec) === 0) return "";
  return spec[0].fee;
};

export default Create_appointment;
