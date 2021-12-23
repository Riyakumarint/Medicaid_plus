import React, { useState, useEffect } from 'react';
//import "./create_Slot.css";
import Sidenav from "../profile/sidenav/SideNav"
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from "react-redux";

import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
const initialState = {doctortId:"", doctor_name:"", clinic_address:""};
export default function Book_Slots(props) {
  const [date, setDate] = useState(null);
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);

  const users = useSelector((state) => state.users);

  const { user, isAdmin } = auth;
  const [slots, setSlots] = useState([]);
  const [doctor, setDoctor] = useState(initialState);
  useEffect(() => {
    if(props.doctor!==initialState){
      setDoctor(props.doctor);
      console.log("uyuy: "+props.doctor.doctortId);
    }
  }, [props.doctor])
  const handleBook = async (e) => {
    if (
      !props.doctor.doctortId ||
      !props.appointmentDetail.title ||
      !props.appointmentDetail.description
    ) {
      alert("Fill All Field");
    }
    else {
      if (e.doctID !== user._id) {
        try {
          const res = await axios.post("/slots/book/" + e._id + "/" + user._id);
          const temp = slots.filter((slot) => slot._id === e._id);
          setSlots(temp);
          props.setDate(e.date);
          console.log("date::::::: "+e.date);
          console.log(res.data);
        } catch (err) {
          console.log("heloo:   " + err);
        }
      }
      else {
        alert("You cannot book your Own slot");
      }
    }
  }

  const renderSlots = (slots) => {
    if (slots.length === 0) return ('Select Date');
    return (
      <div className="col-right">
        <div style={{ overflowX: "auto" }}>
          <table className="medical">
            <thead>
              <tr>
                <th>Slot Date</th>
                <th>Slot Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((slot) =>
                !slot.status ? (<tr key={slot._id}>
                  <td>{(new Date(slot.date)).getDate() + "/" + ((new Date(slot.date)).getMonth() + 1) + "/" + (new Date(slot.date)).getFullYear()}</td>
                  <td>{(new Date(slot.date)).getHours() + " : " + (new Date(slot.date)).getMinutes()}</td>
                  <td>
                    <i className="fas fa-times-circle" title="Open" onClick={() => handleBook(slot)}> Book</i>
                  </td>
                </tr>) : ""
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  };
  const handleOnClick = async (doctor) => {

    if (doctor !== undefined) {
      const m = date.getMonth() + 1;
      console.log("Day: " + date.getDate() + " Month: " + m + " Year: " + date.getFullYear() + " Time: " + date.getHours() + " ::: " + date+" :: "+doctor._id);
      try {
        const docSlots = await axios.get("/slots/patient/" + doctor.doctortId + "/" + date);
        setSlots(docSlots.data);
        console.log(docSlots.data);
      } catch (err) {
        console.log(err);
      }
    }
    else {
      alert("Please Select Doctor");
    }
  }
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div>
      <label htmlFor="doctortId">Get Slots</label>
        <DatePicker selected={date} minDate={new Date()} onChange={(date) => setDate(date)} format='dd-mm-yyyy' /><br /><br />
        <button onClick={() => handleOnClick(doctor)}>Submit</button>
      </div>
      <div>
        <div>
          <h5>Slots</h5>
          {renderSlots(slots)}
        </div>
      </div>
    </>
  )
}