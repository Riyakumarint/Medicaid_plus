import React, { useState, useEffect } from "react";
import Doctor_card from "../doctor_card/Doctor_card";
import axios from "axios";
import SideNav from "../profile/sidenav/SideNav";

const Find_doctor = () => {
  const [specialities, setSpecialities] = useState([]);
  const [speciality, setSpeciality] = useState({ speciality_name: "" });
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState({ city_name: "" });
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState({
    doctortId: "",
    doctor_name: "",
    clinic_address: "",
  });
  const [callback, setCallback] = useState(false);

  // data fetching
  useEffect(() => {
    window.scrollTo({ top: 0 });
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
    const getDoctors = async () => {
      try {
        const res = await axios.post("/api/fetchDoctors/", {
          speciality_name: "",
          city_name: "",
        });
        setDoctors(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getDoctors();
  }, [callback]);

  // handle changes
  const handleChangeSpeciality = async (e) => {
    const { name, value } = e.target;
    setSpeciality({ ...speciality, [name]: value });
    setDoctor({
      ...doctor,
      doctortId: "",
      doctor_name: "",
      clinic_address: "",
    });
    try {
      const res = await axios.post("/api/fetchDoctors/", {
        speciality_name: e.target.value,
        city_name: city.city_name,
      });
      setDoctors(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleChangeCity = async (e) => {
    const { name, value } = e.target;
    setCity({ ...city, [name]: value });
    setDoctor({
      ...doctor,
      doctortId: "",
      doctor_name: "",
      clinic_address: "",
    });
    try {
      const res = await axios.post("/api/fetchDoctors/", {
        speciality_name: speciality.speciality_name,
        city_name: e.target.value,
      });
      setDoctors(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeDoctor = (e) => {
    const { name1, value } = e.target;
    const temp = doctors.filter((doctor) => {
      return doctor.doctortId === value;
    });
    const { doctortId, name, clinic_address } = temp[0];
    setDoctor({
      ...doctor,
      doctortId: doctortId,
      doctor_name: name,
      clinic_address: clinic_address,
    });
  };

  // handle submit

  // renders
  const renderDoctors = (doctors) => {
    if (doctors.length === 0) return "No Doctor Avilable";
    return (
      <div className="col-right">
        <div className="show_blogs">
          {doctors.map((doctor) => (
            <Doctor_card
              doctor={doctor}
              speciality_name={getSpecialityName(
                doctor.speciality_name,
                specialities
              )}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <SideNav />
      <div className="continer-profile">
        <div className="pro">
          <div className="profile_page">
            <div className="profile_header">
              <h4>Find Doctors</h4>
            </div>

            <div className="profile-container">
              {/* Selectdoctor block */}
              <div className="row">
                <div class="col s12 m6 l4">
                  <div className="form-group">
                    <label htmlFor="speciality_name">Speciality</label>
                    <select
                      className="form-control text-capitalize speciality_name"
                      value={speciality.speciality_name}
                      name="speciality_name"
                      onChange={handleChangeSpeciality}
                    >
                      <option value="">Choose a speciality</option>
                      {specialities.map((speciality) => (
                        <option key={speciality._id} value={speciality._id}>
                          {speciality.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
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
                <h5>Doctors</h5>
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
  const spec = specialities.filter((speciality) => {
    return speciality._id === _id;
  });
  if (Lenght(spec) === 0) return "";
  return spec[0].name;
};
const getSpecialityFee = (_id, specialities) => {
  const spec = specialities.filter((speciality) => {
    return speciality._id === _id;
  });
  if (Lenght(spec) === 0) return "";
  return spec[0].fee;
};

export default Find_doctor;
