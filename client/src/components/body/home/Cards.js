import React from "react";
import DoctorList_speciality from "../pages/DoctorList_speciality";

function Cards({ speciality }) {
  return (
    <div className="cards">
      <div className="card_speciality center-align ">
        <img src={speciality.image} alt="s1" className="card_img" />
        <div className="card_body">
          <h5 className="card_title" title={speciality.name}>
            {speciality.name}
          </h5>
          <p className="card_text" title={speciality.fee}>
            ₹{speciality.fee}
          </p>

          <a href="/create_appointments">
            Book now <i class="fa fa-arrow-right" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Cards;
