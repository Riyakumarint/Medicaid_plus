import React, { useState, useEffect } from "react";
import Card from "./Cards";
import axios from "axios";
import "./home.css";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import Carousel1 from "../../../images/doc1.jpg";
import Carousel2 from "../../../images/doc2.jpg";
import Carousel3 from "../../../images/doc3.jpg";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function Home() {
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
                    <h5 class="animated fadeInDown">
                      You are now in safe hands
                    </h5>
                    <p class="animated fadeInUp d-none d-md-block">
                      Choose the experts in end to end surgical care.
                    </p>
                    <div className="slider-btn">
                      <a href="/find_doctor">Find Doctor</a>
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
                    <h5 class="animated fadeInDown">
                      Instant appointment with doctors Guaranteed!
                    </h5>
                    <p class="animated fadeInUp d-none d-md-block">
                      Skip the waiting room. Consult with a doctor
                    </p>
                    <div className="slider-btn">
                      <a href="/create_appointments">Book Appoinment</a>
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
                    <h5 class="animated fadeInDown">
                      Read top articles from health experts
                    </h5>
                    <p class="animated fadeInUp d-none d-md-block">
                      Health articles that keep you informed about good health
                      practices and achieve your goals.
                    </p>
                    <div className="slider-btn">
                      <a href="/articles">Read Articles</a>
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
        <h1 class="header">
          10+ <span>Specialities</span>
        </h1>
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
          {specialities.map((speciality) => (
            <Item>
              <Card key={speciality._id} speciality={speciality} />
            </Item>
          ))}
        </Carousel>

        <div className="service">
          <div class="container">
            <h1 class="header">
              Our <span>GOAL</span>
            </h1>
            <div class="row">
              <div class="col s12 m6 l4">
                <div class="single-service center-align">
                  <i class="lni lni-cart"></i>
                  <h2>Goal of the System</h2>
                  <p>
                    Provide the means to improve the information gathering and
                    administrative tasks of the Hospitals. Reduce the average
                    time taken to register a patient by automating the current
                    manual patient registration system.
                  </p>
                </div>
              </div>
              <div class="col s12 m6 l4">
                <div class="single-service center-align">
                  <i class="lni lni-grow"></i>
                  <h2>Objectives of the System</h2>
                  <p>
                    Eliminate current manual template filled by the doctors to
                    assist in the diagnosis processiby replacing it with a
                    computerized format. Provide doctors with a streamlined view
                    of medical reports in a digital format by linking the
                    laboratory with the doctors’ computers
                  </p>
                </div>
              </div>
              <div class="col s12 m6 l4">
                <div class="single-service center-align">
                  <i class="lni lni-handshake"></i>
                  <h2>What we have done.</h2>
                  <p>
                    We developed this project to reduce patient harassment,
                    saving time of patient & ensure better treatment. Patients
                    can hospital regular updates & features. Also Patient can
                    Book Doctor's Appointment online here. Some modules here :
                    Admin , Sub-Admin, Doctors, Staffs, Patients etc.
                  </p>
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
