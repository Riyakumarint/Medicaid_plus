import React from "react";

function Cards(props) {
  return (
    <div className="cards">
          <div className="card_speciality center-align ">
             
        <img src={props.imgsrc} alt="s1" className="card_img" />
        <div className="card_body">
          <h5 className="card_title">{props.title}</h5>
          <p className="card_text">₹{props.price}</p>
          <a href={props.link}>
            Book now <i class="fa fa-arrow-right" aria-hidden="true"></i>
          </a></div> 
        </div>
      
     </div>
  );
}

export default Cards;
