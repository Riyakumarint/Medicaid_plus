import React from "react";
import Cards from "./Cards.js";
import "./css/style.css";
export default function Appointments_cards(){
    let cards=[{"image":"./img/user1.jpg","name": "Kiran Acharya","info":"28 yrs, Male","Phone":"+91 9876543215","Time": "06:00 PM","Date": "2 Feb 2021","type":"Consult"},{"image":"./img/user1.jpg","name": "Kiran Acharya","info":"28 yrs, Male","Phone":"+91 9876543215","Time": "06:00 PM","Date": "2 Feb 2021","type":"Consult"},{"image":"./img/user1.jpg","name": "Kiran Acharya","info":"28 yrs, Male","Phone":"+91 9876543215","Time": "06:00 PM","Date": "2 Feb 2021","type":"Consult"},{"image":"./img/user1.jpg","name": "Kiran Acharya","info":"28 yrs, Male","Phone":"+91 9876543215","Time": "06:00 PM","Date": "2 Feb 2021","type":"Consult"},{"image":"./img/user1.jpg","name": "Kiran Acharya","info":"28 yrs, Male","Phone":"+91 9876543215","Time": "06:00 PM","Date": "2 Feb 2021","type":"Consult"}];
    console.log(cards[0].image)
    return(
        <>
            <section class="main-content">
            <div class="container">
                <h1>Appointment Card UI</h1>
                <br/>
                <br/>
            <div class="row">
                
        
                {cards.map((card)=>{
                    
                    return <Cards card={card}/>
                })} 
                
            </div>
            </div>
            </section>
        </>
    )
}