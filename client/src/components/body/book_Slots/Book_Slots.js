import React, { useState, useEffect } from "react";
import Sidenav from "../profile/sidenav/SideNav";
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const initialState = { doctortId: "", doctor_name: "", clinic_address: "" };

export default function Book_Slots(props) {
  const [date, setDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState();
  const [doctor, setDoctor] = useState(initialState);

  const { user, isAdmin } = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);

  // Fetch data
  useEffect(() => {
    if (props.doctor !== initialState) {
      setDoctor(props.doctor);
      // console.log("uyuy: " + props.doctor.doctortId);
    }
  }, [props.doctor, user]);

  // handle change
  const handleDateChange = async (date1) => {
    setDate(date1);
    if (doctor !== undefined && date1 !== null) {
      const m = date1.getMonth() + 1;
      try {
        const docSlots = await axios.get(
          "/slots/patient/" + doctor.doctortId + "/" + date1
        );
        setSlots(docSlots.data);
        props.setDate({ date: "", slotId: "" });
        setSelectedSlot();
        // console.log(docSlots.data);
      } catch (err) {
        console.log(err);
      }
    } else if (doctor === undefined) {
      alert("Please Select Doctor");
    }
  };

  // handle submit
  const handleBook = async (e) => {
    props.setDate({ date: e.date, slotId: e._id });
    setSelectedSlot(e.date);
  };

  // render
  const renderSlots = (slots) => {
    if (slots.length === 0) return "No slots";
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
                        className="fa fa-plus-circle"
                        title="Open"
                        onClick={() => handleBook(slot)}
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
      <div>
        <label htmlFor="doctortId">Select a Date</label>
        <DatePicker
          selected={date}
          minDate={new Date()}
          onChange={(date) => handleDateChange(date)}
          format="dd-mm-yyyy"
        />
        <br />
      </div>
      <div>
        <div>
          {selectedSlot === undefined || selectedSlot === "" ? (
            ""
          ) : (
            <div>
              <span className="slot_p">
                {new Date(selectedSlot).toDateString()} at &nbsp;
                {new Date(selectedSlot).toLocaleTimeString()}
              </span>
            </div>
          )}
        </div>
        <div>
          <h5 className="slot_header">Slots</h5>
          {renderSlots(slots)}
        </div>
      </div>
    </>
  );
}
