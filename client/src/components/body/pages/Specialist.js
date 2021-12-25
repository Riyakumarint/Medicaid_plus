import React, { useState, useEffect } from "react";
import Card from "../home/Cards";
import axios from "axios";

function Specialist() {
  const [specialities, setSpecialities] = useState([]);
  const [callback, setCallback] = useState(false);
  useEffect(() => {
    const getSpecialities = async () => {
      const res = await axios.get("/api/speciality");
      setSpecialities(res.data);
    };
    getSpecialities();
  }, [callback]);

  return (
    <>
      <div className="articles">
        <h1>Specialitists</h1>

        <div className="show_blogs">
          {specialities.map((speciality) => (
            <Card key={speciality._id} speciality={speciality} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Specialist;
