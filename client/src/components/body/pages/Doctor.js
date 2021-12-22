import React, { useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactStars from 'react-stars'
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import SideNav from "../profile/sidenav/SideNav";

const initialState = {
    name:"",
    userId:"",
    bloodGroup: "",
    age: "",
    speciality_name: "",
    city_name: "",
    clinic_address: "",
    experience_year: "",
    qualification: [],
    blogRecord: [],
    reviews: {
        rating:"",
        comments:[]
    },
    err: "",
    success: "",
  };

const Doctor = () => {
  const [doctor, setDoctor] = useState(initialState);
  const [doctorUser, setDoctorUser] = useState({avatar:"", email:"", mobile:"", gender:""});
  const [specialities, setSpecialities] = useState([]);
  const [speciality, setSpeciality] = useState({speciality_name: ""});
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState({city_name: ""});
  const [rating, setRating] = useState();

  const [callback, setCallback] = useState(false);

  const token = useSelector((state) => state.token);
  const {user, isLogged, isAdmin, isDoctor} = useSelector((state) => state.auth);

  const {doctorId} = useParams();

  // data fetching
  useEffect(() => {
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
    const getDoctor = async () => {
      try {
        const res = await axios.get( "/profiles/fetchDoctor/"+doctorId );
        setDoctor(res.data);
        
        res.data.reviews.rater.map( (rater) => {
            if(rater.userId===user._id){
                console.log("gotch")
                setRating(rater.rating);
            }
            console.log(rater.userId, user._id);
            return rater
        })

      } catch (err) {
        console.log(err);
      }
    };
    getDoctor();
  }, [callback]);
  useEffect(() => {
    const getDoctorUser = async () => {
      try {
        const res = await axios.get( "/user/fetchDoctorUser/"+doctorId );
        setDoctorUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getDoctorUser();
  }, [callback]);

  // handle changes
  const handleRatingChange = async (e) => {
    const res = await axios.post(
        "/profiles/rateDoctor",
        { doctorId:doctorId, rating:e },
        { headers: { Authorization: token } }
    );
    setCallback(!callback);
  };

  // handle submit

  // renders
  const renderQualification = () =>{
    if(doctor.qualification.length===0) return ('');
    return (
        <div>
            {doctor.qualification.map((qualification) => (
                <div>
                    <h5>
                        {qualification.major + " from " + qualification.college + " - " + qualification.passingyear}
                    </h5>
                </div>
            ))}
        </div>
    )
  }

  return (
    <>
      <SideNav />
      <div className="continer-profile">
        <div className="pro">
            <div className="profile_page">
                <div className="profile_header">
                    <div className="avatar">
                        <img src={doctorUser.avatar} alt="" />
                    </div>
                    <h3> {doctor.name}</h3>
                    <ReactStars
                        count={5}
                        value={Number(doctor.reviews.rating)}
                        size={24}
                        color2={'#ffd700'} 
                        edit={false}
                    />
                    <button
                        type="button"
                        className="button"
                        onClick={() => window.scrollTo({ top: 0 })}
                        >
                        Chat with the Doctor
                    </button>
                </div>

                <div className="profile-container">
                    <div >
                        <h5> {doctor.age} years old - {doctorUser.gender}</h5>
                    </div>
                    <div>
                        {renderQualification()}
                    </div>
                    <div >
                        <h5> Speciality - {getSpecialityName(doctor.speciality_name, specialities)}</h5>
                    </div>
                    <div >
                        <h5> Experience - {doctor.experience_year} years</h5>
                    </div>
                    <div >
                        <h5> Clinic Address - {doctor.clinic_address}</h5>
                    </div>
                    <div >
                        <h5> Contact - {doctorUser.mobile}, {doctorUser.email}</h5>
                    </div>
                    <hr></hr>
                    <br></br>

                    {/* blogs */}
                    <div >
                        <h5> blogs of this doctor goes here</h5>
                    </div>
                    <hr></hr>
                    <br></br>

                    {/* give rating only when logged in*/}
                    <div >
                        {isLogged?<div>
                            <h5> Rate Doctor</h5>
                            <ReactStars
                                count={5}
                                value={rating}
                                onChange={handleRatingChange}
                                size={30}
                                color2={'#ffd700'} 
                            />
                            <hr></hr>
                            <br></br>
                        </div>:""}
                    </div>
                    

                    {/* Comments only when logged in */}
                    <div >
                        {isLogged?<div>
                            <h5> Comments of this doctor goes here</h5>
                            <hr></hr>
                            <br></br>
                        </div>:""}
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

export default Doctor;
