import React, { useState }  from 'react';
//import "./create_Slot.css";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
export default function Book_Slots(){
    const [date, setDate] = useState(null);
    const renderSlots = (slots) =>{
        /*if(slots.length===0) return ('No current Slots');
        return (
          <div className="col-right">
          <div style={{ overflowX: "auto" }}>
              <table className="medical">
                <thead>
                  <tr>
                    <th>Slot Date</th>
                    <th>Slot Time</th>
                    <th>Patient</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {slots.map((slot) => (
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
        )*/
        return(
            <div className="col-right">
          <div style={{ overflowX: "auto" }}>
              <table className="medical">
                <thead>
                  <tr>
                    <th>Slot Date</th>
                    <th>Slot Time</th>
                    <th>Doctor</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={1}>
                      <th>21/12/2021</th>
                      <th>12:30</th>
                      <th>fvgaervsvse</th>
                      <th>Cancel/Reshedule</th>
                  </tr>
                </tbody>
                <tbody>
                  <tr key={2}>
                      <th>21/12/2021</th>
                      <th>12:30</th>
                      <th>fvgaervsvse</th>
                      <th>Cancel/Reshedule</th>
                  </tr>
                </tbody>
                <tbody>
                  <tr key={3}>
                      <th>21/12/2021</th>
                      <th>12:30</th>
                      <th>fvgaervsvse</th>
                      <th>Cancel/Reshedule</th>
                  </tr>
                </tbody>
              </table>
          </div>
          </div>
        )
      };
      const handleOnClick= ()=>{
          const m= date.getMonth()+1;
          console.log("Day: "+date.getDate()+" Month: "+m+" Year: "+date.getFullYear()+" Time: "+date.getHours());

      }
    return (
        <>
        <br/>
        <br/>
        <br/>
        <br/>
        <div>
            <h5>Get Slots</h5>
            <DatePicker selected={date} minDate={new Date()} onChange={(date)=>setDate(date)} format='dd-mm-yyyy'  /><br/><br/>
            <button onClick={handleOnClick}>Submit</button>
        </div>
        <div>
            <div>
            <h5>Slots</h5>
            {renderSlots()}
            </div>
        </div>
        <h1> hi </h1>
        </>
    )
}