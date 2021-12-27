import React, { useState, useEffect } from "react";
import "./create_Slot.css";
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import SideNav from "../profile/sidenav/SideNav";

export default function Create_Slots() {
  const [date, setDate] = useState(null);
  const [newdate, setNewDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const [callback, setCallBack] = useState(false);

  const { user, isAdmin } = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const users = useSelector((state) => state.users);

  // fetch data
  useEffect(() => {
    const getSlots = async () => {
      try {
        const res = await axios.get("/slots/doctor/" + user._id);
        setSlots(res.data);
        // console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getSlots();
  }, [user, callback]);

  // handle submit
  const handleOnClick = async (e) => {
    if (date === null) {
      alert("Enter a slot time");
    } else {
      const slot = {
        doctID: user._id,
        patientID: "",
        date: date,
        status: false,
      };
      setDate(null);
      try {
        const res = await axios.post("/slots", slot);
        setSlots([...slots, res.data]);
        // console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleDelete = async (e) => {
    try {
      const res = await axios.post("/slots/delete/" + e._id);
      setCallBack(!callback);
      // console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  // render
  const BookedrenderSlots = (slots) => {
    if (slots.length === 0) return "No current Book Slots";
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
                slot.status ? (
                  <tr key={slot._id}>
                    <td>{new Date(slot.date).toDateString()}</td>
                    <td>{new Date(slot.date).toLocaleTimeString()}</td>
                    <td>{slot.patientName}</td>
                    <td>
                      <i
                        class="fa fa-check-square-o"
                        onClick={() => handleDelete(slot)}
                        aria-hidden="true"
                      ></i>
                    </td>
                  </tr>
                ) : (
                  ""
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const UNBookedrenderSlots = (slots) => {
    if (slots.length === 0) return "No current UnBook Slots";
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
                !slot.status ? (
                  <tr key={slot._id}>
                    <td>{new Date(slot.date).toDateString()}</td>
                    <td>{new Date(slot.date).toLocaleTimeString()}</td>
                    <td>
                      <i
                        className="fas fa-trash-alt"
                        title="Open"
                        onClick={() => handleDelete(slot)}
                      ></i>
                    </td>
                  </tr>
                ) : (
                  ""
                )
              )}
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
          <div className="Body-Create-slots">
            <div>
              <div>
                <h5>Booked Slots</h5>
                {BookedrenderSlots(slots)}
              </div>
              <br />
              <div>
                <h5>Unbooked Slots</h5>
                {UNBookedrenderSlots(slots)}
              </div>
            </div>
            <br />
            <div>
              <h5>Create Slots</h5>
              <DatePicker
                selected={date}
                minDate={new Date()}
                onChange={(date) => setDate(date)}
                showTimeSelect
                dateFormat="Pp"
              />
              <button
                type="button"
                className="category_button"
                onClick={() => handleOnClick()}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
