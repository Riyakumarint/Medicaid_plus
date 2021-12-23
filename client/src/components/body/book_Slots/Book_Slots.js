import React, { useState, useEffect } from 'react';
//import "./create_Slot.css";
import Sidenav from "../profile/sidenav/SideNav" 
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from "react-redux";

import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
export default function Book_Slots(porps) {
  const [date, setDate] = useState(null);
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);

  const users = useSelector((state) => state.users);

  const { user, isAdmin } = auth;
  const [slots, setSlots] = useState([]);

  const handleBook= async(e)=>{
    if(e.doctID!==user._id){
    try{
        const res = await axios.post("/slots/book/"+e._id+"/"+user._id);
        slots.filter((slot)=> slot._id===e._id);
        console.log(res.data);
      }catch(err){
        console.log("heloo:   "+err);
      }
    }
    else{
      alert("You cannot book your Own slot");
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
                    <i className="fas fa-times-circle" title="Open" onClick={()=>handleBook(slot)}> Book</i>
                  </td>
                </tr>) : ""
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  };
  const handleOnClick = async() => {
    const m = date.getMonth() + 1;
    console.log("Day: " + date.getDate() + " Month: " + m + " Year: " + date.getFullYear() + " Time: " + date.getHours()+" ::: "+date);
    try{
      const docSlots = await axios.get("/slots/patient/"+"619562ceddb4361637dfafb4/"+date);
      setSlots(docSlots.data);
      console.log(docSlots.data);
    }catch(err){
      console.log(err);
    }
  }
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div>
        
        <h5>Get Slots</h5>
        <DatePicker selected={date} minDate={new Date()} onChange={(date) => setDate(date)} format='dd-mm-yyyy' /><br /><br />
        <button onClick={handleOnClick}>Submit</button>
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