import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactStars from 'react-stars'
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import SideNav from "../profile/sidenav/SideNav";


const LabTest = () => {
  const [name, setName] = useState("");
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState({city_name: ""});
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState({doctortId:"", doctor_name:"", clinic_address:""});
  const [callback, setCallback] = useState(false);
 

  // data fetching
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
          {speciality_name: "", city_name: ""}
        );
        setDoctors(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getDoctors();
  }, [callback]);

  // handle changes
  const handleChangeCity = async (e) => {
    const { name, value } = e.target;
    setCity({ ...city, [name]: value});
    setDoctor({...doctor, doctortId:"", doctor_name:"", clinic_address:""})
    try {
      const res = await axios.post(
        "/api/fetchDoctors/",
        {speciality_name: "", city_name: e.target.value}
      );
      setDoctors(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeName = (e) => {
    const { name, value } = e.target;
    setName(value);
  };

  // handle submit
  const handleBookTest = () => {
    if(name===""){
        alert("Enter the test name")
    } else{
        alert("Thanks for booking "+name+" test, We will take samples from your doorsteps, sit tight, stay safe !!!");
    }
  };

  // renders
  const renderDoctors = (doctors) =>{
    if(doctors.length===0) return ('No Center Avilable');
    return (
      <div className="col-right">
      <div style={{ overflowX: "auto" }}>
          <table className="medical">
            <thead>
              <tr>
                <th>Facility Name</th>
                <th>Rating</th>
                <th>Enter Test</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor._id}>
                  <td>{doctor.clinic_address}</td>
                  <td><ReactStars
                        count={5}
                        value={Number(doctor.reviews.rating)}
                        size={24}
                        color2={'#ffd700'} 
                        edit={false}
                    /></td>
                  <td>
                    <input
                        className="name"
                        id="exampleInputname1"
                        placeholder="name"
                        onChange={handleChangeName}
                        name="name"
                    /> 
                    <i
                        className="fas fa-vial"
                        title="Add"
                        onClick={() => handleBookTest()}
                  > </i>
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
            <div className="profile_page">
              <div className="profile_header">
                <h4>Book Your Lab Test</h4>
              </div>

              <div className="profile-container">

                {/* Selectdoctor block */}
                <div className="row">
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
                </div>

                <div>
                    <h5>Centers</h5>
                    {renderDoctors(doctors)}
                </div>

              </div>
            </div>
        </div>
      </div>
    </>
  );
};

const Lenght = (symptoms) => symptoms.length;

const getSpecialityName = (_id, specialities) => {
    const spec = specialities.filter( speciality => { return speciality._id===_id});
    if(Lenght(spec)===0) return "";
    return spec[0].name;
}
const getSpecialityFee = (_id, specialities) => {
    const spec = specialities.filter( speciality => { return speciality._id===_id});
    if(Lenght(spec)===0) return "";
    return spec[0].fee;
}

export default LabTest
