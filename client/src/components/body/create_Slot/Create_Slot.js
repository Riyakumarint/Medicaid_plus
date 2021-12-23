import React, { useState,useEffect }  from 'react';
import "./create_Slot.css";
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import SideNav from '../profile/sidenav/SideNav';
export default function Create_Slots(){
    const auth = useSelector((state) => state.auth);
    const token = useSelector((state) => state.token);

    const users = useSelector((state) => state.users);

    const { user, isAdmin } = auth;
    const [date, setDate] = useState(null);
    const [newdate, setNewDate] = useState(null);
    const [slots, setSlots] = useState([]);
    const [callback,setCallBack]=useState(false);
    useEffect(() => {
        const getSlots= async()=>{
            try{
                const res = await axios.get("/slots/doctor/"+user._id);
                setSlots(res.data);
                console.log(res.data);
            }catch(err){
                console.log("Hiii: "+err);
            }
        };
        getSlots();
    }, [user._id,callback]);
    const handleReshedule = async(e)=>{
      console.log("try"+e);
      try{
        const res = await axios.post("/slots/reshedule/"+e._id+"/"+newdate);
        console.log(res.data);
      }catch(err){
        console.log("heloo:   "+err);
      }
    };
    const BookedrenderSlots = (slots) =>{
        if(slots.length===0) return ('No current Book Slots');
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
                {slots.map((slot) => 
                         slot.status?(<tr key={slot._id}>
                            <td>{(new Date(slot.date)).getDate()+"/"+((new Date(slot.date)).getMonth()+1)+"/"+(new Date(slot.date)).getFullYear()}</td>
                            <td>{(new Date(slot.date)).getHours()+" : "+(new Date(slot.date)).getMinutes()}</td>
                            <td>{slot.patientID}</td>
                            <td>
                                <button onClick={()=> handleDelete(slot)}>Finished</button>
                            </td>
                          </tr>):""
                )};
                </tbody>
              </table>
          </div>
          </div>
        )
      };
      const handleDelete= async(e)=>{
        try{
            const res = await axios.post("/slots/delete/"+e._id);
            setCallBack(!callback);
            console.log(res.data);
          }catch(err){
            console.log("heloo:   "+err);
          }
      }
      const UNBookedrenderSlots = (slots) =>{
        if(slots.length===0) return ('No current UnBook Slots');
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
                         !slot.status?(<tr key={slot._id}>
                            <td>{(new Date(slot.date)).getDate()+"/"+((new Date(slot.date)).getMonth()+1)+"/"+(new Date(slot.date)).getFullYear()}</td>
                            <td>{(new Date(slot.date)).getHours()+" : "+(new Date(slot.date)).getMinutes()}</td>
                            <td>
                                <i className="fas fa-times-circle" title="Open" onClick={()=>handleDelete(slot)}> Delete</i>
                            </td>
                          </tr>):""
                )}
                </tbody>
              </table>
          </div>
          </div>
        )
      };
      const handleOnClick= async(e)=>{
          console.log("Day: "+date.getDate()+" Month: "+date.getMonth()+1+" Year: "+date.getFullYear()+" Time: "+date.getHours()+" ::: "+date);
          const slot={
            doctID: user._id,
            patientID:"",
            date:date,
            status: false,
          };
          try{
            const res = await axios.post("/slots", slot);
            setSlots([...slots, res.data]);
            console.log(res.data);
          }catch(err){
            console.log("heloo:   "+err);
          }
      }
    return (
        <>
        <br/>
        <br/>
        <br/>
        <br/>
        <SideNav/>
        <div className="continer-profile">
        <div className="pro">
        <div className="Body-Create-slots">
        
        <div>
            <div>
            <h5>Booked Slots</h5>
            {BookedrenderSlots(slots)}
            </div>
            <div>
            <h5>Unbooked Slots</h5>
            {UNBookedrenderSlots(slots)}
            </div>
        </div>
        <div>
            <h5>Create Slots</h5>
            <DatePicker selected={date} minDate={new Date()} onChange={(date)=>setDate(date)} showTimeSelect dateFormat="Pp"  /><br/><br/>
            <button onClick={handleOnClick}>Submit</button>
        </div>
        </div>
        </div>
        </div>
        </>
    )
}