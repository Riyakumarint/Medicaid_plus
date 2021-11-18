import React from "react";

import "./home.css";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import Carousel1 from "../../../images/doc1.jpg";
import Carousel2 from "../../../images/doc2.jpg";
import Carousel3 from "../../../images/doc3.jpg";
import s1 from "../../../images/ayurvedic.jpeg";
import s2 from "../../../images/cardiology-icon.jpeg";
import s3 from "../../../images/dermatology.png";
import s4 from "../../../images/gynecology-icon.jpeg";
import s5 from "../../../images/ophthalmology.jpeg";
import s6 from "../../../images/orthopedic-icon.jpeg";
import s7 from "../../../images/padiatrics.png";
import s8 from "../../../images/psychiatry.png";
import s9 from "../../../images/sexology.png";
import s10 from "../../../images/stethoscope-icon.png";
import s11 from "../../../images/stomach-icon.png";
import s12 from "../../../images/surgeon.png";
import s13 from "../../../images/teeth-icon.png";
import s14 from "../../../images/uro-icon.png";
// import d1 from "../../../images/d1.jpeg";
// import d2 from "../../../images/d2.jpeg";
// import d3 from "../../../images/d3.jpeg";
// import d4 from "../../../images/d4.jpeg";
// import d5 from "../../../images/d5.jpeg";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function Home() {
  return (
    <div className="home_page">
      <div className="cor c1">
        <div className="row">
          <div className="carouselstyle">
            <div
              id="carouselExampleInterval"
              class="carousel slide"
              data-ride="carousel"
            >
              
              <div class="carousel-inner">
                <div class="carousel-item active" data-interval="10000">
                  <img
                    src={Carousel1}
                    className="carousel-img"
                    class="d-block w-100"
                    alt="C1"
                  />
                  <div class="carousel-caption">
                    <h5 class="animated fadeInDown">First slide label</h5>
                    <p class="animated fadeInUp d-none d-md-block">
                      Nulla vitae elit libero, a pharetra augue mollis interdum.
                    </p>
                    <div className="slider-btn">
                      <a href="/video_consult">
                        Video Consult
                      </a>
                    </div>
                  </div>
                </div>
                <div class="carousel-item" data-interval="2000">
                  <img
                    src={Carousel3}
                    cla9ssName="carousel-img"
                    class="d-block w-100"
                    alt="..."
                  />
                  <div class="carousel-caption ">
                    <h5 class="animated fadeInDown">second slide label</h5>
                    <p class="animated fadeInUp d-none d-md-block">
                    Search & Book Online Doctor Appointment Here
                    </p>
                    <div className="slider-btn">
                      <a href="/appoinment_booking">
                        BOOK Appoinment
                      </a>
                    </div>
                  </div>
                </div>
                <div class="carousel-item">
                  <img
                    src={Carousel2}
                    className="carousel-img"
                    class="d-block w-100"
                    alt="..."
                  />
                  <div class="carousel-caption ">
                    <h5 class="animated fadeInDown">third slide label</h5>
                    <p class="animated fadeInUp d-none d-md-block">
                    Search & Book Online Doctor Appointment Here
                    </p>
                    <div className="slider-btn">
                      <a href="/articles">
                      Read Articles
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <a
                class="carousel-control-prev"
                href="#carouselExampleInterval"
                role="button"
                data-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="sr-only">Previous</span>
              </a>
              <a
                class="carousel-control-next"
                href="#carouselExampleInterval"
                role="button"
                data-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="special">
      <h1 class="header">10+ <span>Specialities</span></h1>
        <div className="specialist">
          <h2>Consult with top doctors across specialities</h2>
          <a
            className="specialist_a"
            href="/specialist"
            onClick={() => window.scrollTo({ top: 0 })}
          >
            View all Specialists
          </a>
        </div>
        <p className="specialist_text">
          Connect instantly with a 24x7 specialist or choose to video visit a
          particular doctor.
        </p>

        <Carousel breakPoints={breakPoints}>
          <Item>
            <div class="card_speciality">
              <img src={s1} alt="s1" className="card_img" />
              <div className="card_body">
                <h5 className="card_title">Ayurveda</h5>
                <p className="card_text">₹500</p>
                <a href="#">
                  Book now <i class="fa fa-arrow-right" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </Item>
          <Item>
          <div class="card_speciality">
              <img src={s2} alt="s2" className="card_img" />
              <div className="card_body">
                <h5 className="card_title">Cardiology</h5>
                <p className="card_text">₹2500</p>
                <a href="#">
                  Book now <i class="fa fa-arrow-right" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </Item>
          <Item>
          <div class="card_speciality">
              <img src={s3} alt="s3" className="card_img" />
              <div className="card_body">
                <h5 className="card_title">Dermatology</h5>
                <p className="card_text">₹1500</p>
                <a href="#">
                  Book now <i class="fa fa-arrow-right" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </Item>
          <Item>
          <div class="card_speciality">
              <img src={s4} alt="s4" className="card_img" />
              <div className="card_body">
                <h5 className="card_title">Gynecology</h5>
                <p className="card_text">₹600</p>
                <a href="#">
                  Book now <i class="fa fa-arrow-right" aria-hidden="true"></i>
                </a>{" "}
              </div>
            </div>
          </Item>
          <Item>
          <div class="card_speciality">
              <img src={s5} alt="s5" className="card_img" />
              <div className="card_body">
                <h5 className="card_title">Ophthalmology</h5>
                <p className="card_text">₹500</p>
                <a href="#">
                  Book now <i class="fa fa-arrow-right" aria-hidden="true"></i>
                </a>{" "}
              </div>
            </div>
          </Item>
          <Item>
          <div class="card_speciality">
              <img src={s6} alt="s6" className="card_img" />
              <div className="card_body">
                <h5 className="card_title">Orthopedic</h5>
                <p className="card_text">₹800</p>
                <a href="#">
                  Book now <i class="fa fa-arrow-right" aria-hidden="true"></i>
                </a>{" "}
              </div>
            </div>
          </Item>
          <Item>
          <div class="card_speciality">
              <img src={s7} alt="s7" className="card_img" />
              <div className="card_body">
                <h5 className="card_title">Padiatrics</h5>
                <p className="card_text">₹500</p>
                <a href="#">
                  Book now <i class="fa fa-arrow-right" aria-hidden="true"></i>
                </a>{" "}
              </div>
            </div>
          </Item>
          <Item>
          <div class="card_speciality">
              <img src={s8} alt="s8" className="card_img" />
              <div className="card_body">
                <h5 className="card_title">Psychiatry</h5>
                <p className="card_text">₹550</p>
                <a href="#">
                  Book now <i class="fa fa-arrow-right" aria-hidden="true"></i>
                </a>{" "}
              </div>
            </div>
          </Item>
          <Item>
          <div class="card_speciality">
              <img src={s9} alt="s9" className="card_img" />
              <div className="card_body">
                <h5 className="card_title">Sexology</h5>
                <p className="card_text">₹550</p>
                <a href="#">
                  Book now <i class="fa fa-arrow-right" aria-hidden="true"></i>
                </a>{" "}
              </div>
            </div>
          </Item>
          <Item>
          <div class="card_speciality">
              <img src={s10} alt="s10" className="card_img" />
              <div className="card_body">
                <h5 className="card_title">General Physician</h5>
                <p className="card_text">₹550</p>
                <a href="#">
                  Book now <i class="fa fa-arrow-right" aria-hidden="true"></i>
                </a>{" "}
              </div>
            </div>
          </Item>
          <Item>
          <div class="card_speciality">
              <img src={s11} alt="s11" className="card_img" />
              <div className="card_body">
                <h5 className="card_title">Gastroenterologist</h5>
                <p className="card_text">₹550</p>
                <a href="#">
                  Book now <i class="fa fa-arrow-right" aria-hidden="true"></i>
                </a>{" "}
              </div>
            </div>
          </Item>
          <Item>
          <div class="card_speciality">
              <img src={s12} alt="s12" className="card_img" />
              <div className="card_body">
                <h5 className="card_title">Surgeon</h5>
                <p className="card_text">₹550</p>
                <a href="#">
                  Book now <i class="fa fa-arrow-right" aria-hidden="true"></i>
                </a>{" "}
              </div>
            </div>
          </Item>
          <Item>
          <div class="card_speciality">
              <img src={s13} alt="s13" className="card_img" />
              <div className="card_body">
                <h5 className="card_title">Dentist</h5>
                <p className="card_text">₹550</p>
                <a href="#">
                  Book now <i class="fa fa-arrow-right" aria-hidden="true"></i>
                </a>{" "}
              </div>
            </div>
          </Item>
          <Item>
          <div class="card_speciality">
              <img src={s14} alt="s14" className="card_img" />
              <div className="card_body">
                <h5 className="card_title">Urology</h5>
                <p className="card_text">₹550</p>
                <a href="#">
                  Book now <i class="fa fa-arrow-right" aria-hidden="true"></i>
                </a>{" "}
              </div>
            </div>
          </Item>
        </Carousel>
        
        <div className="service">
        <div class="container">
		<h1 class="header">Our <span>GOAL</span></h1>
		<div class="row">
			<div class="col s12 m6 l4">
				<div class="single-service center-align">
					<i class="lni lni-cart"></i>
					<h2>Goal of the System</h2>
					<p>Provide the means to improve the information gathering and administrative tasks of the Hospitals. Reduce the average time taken to register a patient by automating the current manual patient registration system.</p>
				</div>
			</div>
			<div class="col s12 m6 l4">
				<div class="single-service center-align">
					<i class="lni lni-grow"></i>
					<h2>Objectives of the System</h2>
					<p>

Eliminate current manual template filled by the doctors to assist in the diagnosis processiby replacing it with a computerized format. Provide doctors with a streamlined view of medical reports in a digital format by linking the laboratory with the doctors’ computers</p>
				</div>
			</div>
			<div class="col s12 m6 l4">
				<div class="single-service center-align">
					<i class="lni lni-handshake"></i>
					<h2>What we have done.</h2>
					<p>We developed this project to reduce patient harassment, saving time of patient & ensure better treatment. Patients can hospital regular updates & features. Also Patient can Book Doctor's Appointment online here. Some modules here : Admin , Sub-Admin, Doctors, Staffs, Patients etc.</p>
				</div>
			</div>
		</div>
	</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
