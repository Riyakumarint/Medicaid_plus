import React from "react";

function Cards({speciality}) {
  return (
    <div className="cards">
          <div className="card_speciality center-align ">
             
        <img src={speciality.image} alt="s1" className="card_img" />
        <div className="card_body">
          <h5 className="card_title" title={speciality.name}>{speciality.name}</h5>
          <p className="card_text" title={speciality.fee}>₹{speciality.fee}</p>
          <a href="#">
            Book now <i class="fa fa-arrow-right" aria-hidden="true"></i>
          </a>
        </div> 
        </div>
      
     </div>
  );
}

export default Cards;
