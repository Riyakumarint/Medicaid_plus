import React, { useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactStars from 'react-stars'
import axios from "axios";
import "./articles.css"

function Doctor_card({doctor}) {
    const [doctorUser, setDoctorUser] = useState({avatar:"", email:"", mobile:"", gender:""});
    const [callback, setCallback] = useState(false);
    const [specialities, setSpecialities] = useState([]);
  const [speciality, setSpeciality] = useState({speciality_name: ""});
    useEffect(() => {
        const getDoctorUser = async () => {
          try {
            const res = await axios.get( "/user/fetchDoctorUser/"+doctor.userId );
            setDoctorUser(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getDoctorUser();
      }, [callback]);
      useEffect(() => {
        const getSpecialities = async () => {
          const res = await axios.get("/api/speciality");
          setSpecialities(res.data);
        };
        getSpecialities();
      }, [callback]);
      const getSpecialityFee = (_id, specialities) => {
        const spec = specialities.filter( speciality => { return speciality._id===_id});
        if(Lenght(spec)===0) return "";
        return spec[0].fee;
    }
    const Lenght = (symptoms) => symptoms.length;

    return (
        <div className="blog_card">           
            <img src={doctorUser.avatar} alt="" />
            <div className="blog_box">
                <h2 title={doctor.name}>{doctor.name}</h2>
                <ReactStars
                    count={5}
                    value={Number(doctor.reviews.rating)}
                    size={24}
                    color2={'#ffd700'} 
                    edit={false}
                />
                <p>{doctor.clinic_address}</p>
            </div>       
            <Link className='btn_blog_view' onClick={() => window.scrollTo({ top: 0 })} to={`/doctor/${doctor.userId}`}>
            View
          </Link>
            
        </div>
    )
}

export default Doctor_card
