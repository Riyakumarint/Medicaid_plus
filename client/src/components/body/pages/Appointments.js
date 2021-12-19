import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import './get.css'
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import SideNav from "../profile/sidenav/SideNav";

const Appointments = () => {

  const [appointments, setAppointments] = useState([]);
  const [currentAppointments, setCurrentAppointments] = useState([]);
  const [previousAppointments, setPreviousAppointments] = useState([]);
  const [callback, setCallback] = useState(false);

  const token = useSelector((state) => state.token);
  const {user} = useSelector((state) => state.auth);
  const auth = useSelector((state) => state.auth);
  const { isLogged, isAdmin, isDoctor} = auth;

  // data fetching
  useEffect(async () => {
    try {
        const res = await axios.get(
          "/appointments/fetchAppointments",
          { headers: { Authorization: token } }
        );
        setAppointments(res.data);
        const currAppointments = res.data.filter(appointment => appointment.status === "active")
        setCurrentAppointments(currAppointments);
        const preAppointments = res.data.filter(appointment => appointment.status !== "active")
        setPreviousAppointments(preAppointments);
      } catch (err) {
        console.log(err);
      }
  }, [callback]);

  // handle changes


  // handle submit


  // renders
  const renderAppointments = (appointments) =>{
    if(appointments.length===0) return ('No current appointments');
    return (
      <div className="col-right">
      <div style={{ overflowX: "auto" }}>
          <table className="medical">
            <thead>
              <tr>
                <th>Meeting Detail</th>
                <th>Title</th>
                <th>Doctor</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{(appointment.meetingDetail).substring(0, 21)}</td>
                  <td>{appointment.title}</td>
                  <td>{appointment.doctortId}</td>
                  <td>
                    <Link to={`/appointment/${appointment._id}`}>
                      <i className="fas fa-stethoscope" title="Open"> Open</i>
                    </Link>
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
          {appointments.err && showErrMsg(appointments.err)}
          {appointments.success && showSuccessMsg(appointments.success)}

          <div className="profile_page">
            <div className="profile_header">
              <h4>Appointments</h4>
              <button
                type="button"
                className="button" 
                onClick={() => window.scrollTo({ top: 0 })} >
                <a href={isDoctor?"/get_appointments":"/create_appointments"} onClick={() => window.scrollTo({ top: 0 })}>
                    <span class="icon">
                        <i class={isDoctor?"fas fa-sync-alt":"fas fa-calendar-plus"} aria-hidden="true"></i>
                    </span>
                    <span class="title"> {isDoctor?"Refresh":"Book Appointment"}</span>
                </a>
              </button>
            </div>

            <div>
              <h5>Current Appointments</h5>
              {renderAppointments(currentAppointments)}
            </div>
            <hr></hr>
            <br></br>
            <div>
              <h5>Previous Appointments</h5>
              {renderAppointments(previousAppointments)}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Appointments;
