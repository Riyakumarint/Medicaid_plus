import React, { useState, useEffect } from "react";
import axios from "axios";
import Doctor_card from "../doctor_card/Doctor_card";

function DoctorList_speciality({ speciality }) {
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState({ speciality_name: speciality.name });
  const [callback, setCallback] = useState(false);

  // Doctors in this speciality
  useEffect(() => {
    const getDoctors = async () => {
      try {
        const res = await axios.post("/api/fetchSpecialists/", {
          speciality_name: speciality.name,
        });

        setDoctors(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getDoctors();
  }, [callback]);

  // renders
  const renderDoctors = (doctors) => {
    if (doctors.length === 0) return "No Doctor Avilable";
    return (
      <div className="col-right">
        <div className="show_blogs">
          {doctors.map((doctor) => (
            <Doctor_card doctor={doctor} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="doc_specialtist">{renderDoctors(doctors)}</div>
    </>
  );
}

export default DoctorList_speciality;
