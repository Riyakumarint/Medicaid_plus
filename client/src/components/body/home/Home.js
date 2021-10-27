import React from "react";
import "./home.css";
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
import s13 from "../../../images/teeth-icon.jpeg";
import s14 from "../../../images/uro-icon.png";
import d1 from "../../../images/d1.jpeg";
import d2 from "../../../images/d2.jpeg";
import d3 from "../../../images/d3.jpeg";
import d4 from "../../../images/d4.jpeg";
import d5 from "../../../images/d5.jpeg";

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
              <ol class="carousel-indicators">
                <li
                  data-target="#carouselExampleCaptions"
                  data-slide-to="0"
                  class="active"
                ></li>
                <li
                  data-target="#carouselExampleCaptions"
                  data-slide-to="1"
                ></li>
                <li
                  data-target="#carouselExampleCaptions"
                  data-slide-to="2"
                ></li>
              </ol>
              <div class="carousel-inner">
                <div class="carousel-item c1 active" data-interval="10000">
                  <img
                    src={Carousel1}
                    className="carousel-img"
                    class="d-block w-100"
                    alt="C1"
                  />
                  <div class="carousel-caption d-none d-md-block">
                    <h5>First slide label</h5>
                    <p>
                      Nulla vitae elit libero, a pharetra augue mollis interdum.
                    </p>
                    <div className="slider-btn">
                      <a href="/video_consult">
                        <button className="btn">Video Consult</button>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="carousel-item c1" data-interval="2000">
                  <img
                    src={Carousel2}
                    cla9ssName="carousel-img"
                    class="d-block w-100"
                    alt="..."
                  />
                  <div class="carousel-caption d-none d-md-block">
                    <h5>second slide label</h5>
                    <p>
                      Nulla vitae elit libero, a pharetra augue mollis interdum.
                    </p>
                    <div className="slider-btn">
                      <a href="/appoinment_booking">
                        <button className="btn btn-1">
                          Book an appoinment
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="carousel-item c1">
                  <img
                    src={Carousel3}
                    className="carousel-img"
                    class="d-block w-100"
                    alt="..."
                  />
                  <div class="carousel-caption d-none d-md-block">
                    <h5>third slide label</h5>
                    <p>
                      Nulla vitae elit libero, a pharetra augue mollis interdum.
                    </p>
                    <div className="slider-btn">
                      <a href="/articles">
                        <button className="btn btn-1">Read Articles</button>
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
      {/* <div className="border">
          <div className="row">
          <div className="col-sm-12">
            <a href="#" className="icon"><i class="fa fa-snowflake-o" aria-hidden="true"></i></a>
            <a href="#" className="icon"><i class="fa fa-snowflake-o" aria-hidden="true"></i></a>
            <a href="#" className="icon"><i class="fa fa-snowflake-o" aria-hidden="true"></i></a>
            <a href="#" className="icon"><i class="fa fa-snowflake-o" aria-hidden="true"></i></a>
            </div>
            </div>
        </div> */}
      <div className="special">
        <div className="container-fluid">
          <h1>Specialitists</h1>
          <p className="content">
            {" "}
            Consult with top doctors across specialities
          </p>
          <div className="row">
            <div className="col-md-12">
              <div id="inam" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <div class="container">
                      <div class="row">
                        <div class="col-sm-12 col-lg-4">
                          <div class="card">
                            {/* <div className="card text-center"> */}
                            <img src={s1} alt="s1" className="card-img-top" />
                            <div className="card-body">
                              <h5 className="card-title">Ayurveda</h5>
                              <p className="card-text">₹400</p>
                              <a href="#">
                                Book now{" "}
                                <i
                                  class="fa fa-arrow-right"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-12 col-lg-4">
                          <div class="card">
                            <img src={s2} alt="s1" className="card-img-top" />
                            <div className="card-body">
                              <h5 className="card-title">Cardiology</h5>
                              <p className="card-text">₹2500</p>
                              <a href="#">
                                Book now{" "}
                                <i
                                  class="fa fa-arrow-right"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-12 col-lg-4">
                          <div class="card">
                            <img src={s3} alt="s1" className="card-img-top" />
                            <div className="card-body">
                              <h5 className="card-title">Dermatology</h5>
                              <p className="card-text">₹1500</p>
                              <a href="#">
                                Book now{" "}
                                <i
                                  class="fa fa-arrow-right"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-12 col-lg-4">
                          <div class="card">
                            <img src={s4} alt="s1" className="card-img-top" />
                            <div className="card-body">
                              <h5 className="card-title">Gynecology</h5>
                              <p className="card-text">₹500</p>
                              <a href="#">
                                Book now{" "}
                                <i
                                  class="fa fa-arrow-right"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-12 col-lg-4">
                          <div class="card">
                            <img src={s5} alt="s1" className="card-img-top" />
                            <div className="card-body">
                              <h5 className="card-title">Ophthalmology</h5>
                              <p className="card-text">₹350</p>
                              <a href="#">
                                Book now{" "}
                                <i
                                  class="fa fa-arrow-right"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-12 col-lg-4">
                          <div class="card">
                            <img src={s6} alt="s1" className="card-img-top" />
                            <div className="card-body">
                              <h5 className="card-title">Orthopedic</h5>
                              <p className="card-text">₹530</p>
                              <a href="#">
                                Book now{" "}
                                <i
                                  class="fa fa-arrow-right"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-12 col-lg-4">
                          <div class="card">
                            <img src={s7} alt="s1" className="card-img-top" />
                            <div className="card-body">
                              <h5 className="card-title">Padiatrics</h5>
                              <p className="card-text">₹900</p>
                              <a href="#">
                                Book now{" "}
                                <i
                                  class="fa fa-arrow-right"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-12 col-lg-4">
                          <div class="card">
                            <img src={s8} alt="s1" className="card-img-top" />
                            <div className="card-body">
                              <h5 className="card-title">Psychiatry</h5>
                              <p className="card-text">₹1500</p>
                              <a href="#">
                                Book now{" "}
                                <i
                                  class="fa fa-arrow-right"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-12 col-lg-4">
                          <div class="card">
                            <img src={s9} alt="s1" className="card-img-top" />
                            <div className="card-body">
                              <h5 className="card-title">Sexology</h5>
                              <p className="card-text">₹800</p>
                              <a href="#">
                                Book now{" "}
                                <i
                                  class="fa fa-arrow-right"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-12 col-lg-4">
                          <div class="card">
                            <img src={s10} alt="s1" className="card-img-top" />
                            <div className="card-body">
                              <h5 className="card-title">General Physician</h5>
                              <p className="card-text">₹300</p>
                              <a href="#">
                                Book now{" "}
                                <i
                                  class="fa fa-arrow-right"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-12 col-lg-4">
                          <div class="card">
                            <img src={s11} alt="s1" className="card-img-top" />
                            <div className="card-body">
                              <h5 className="card-title">
                                Stomach and Digestion
                              </h5>
                              <p className="card-text">₹300</p>
                              <a href="#">
                                Book now{" "}
                                <i
                                  class="fa fa-arrow-right"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-12 col-lg-4">
                          <div class="card">
                            <img src={s12} alt="s1" className="card-img-top" />
                            <div className="card-body">
                              <h5 className="card-title">surgeon</h5>
                              <p className="card-text">₹8500</p>
                              <a href="#">
                                Book now{" "}
                                <i
                                  class="fa fa-arrow-right"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-12 col-lg-4">
                          <div class="card">
                            <img src={s13} alt="s1" className="card-img-top" />
                            <div className="card-body">
                              <h5 className="card-title">Dentist</h5>
                              <p className="card-text">₹450</p>
                              <a href="#">
                                Book now{" "}
                                <i
                                  class="fa fa-arrow-right"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-12 col-lg-4">
                          <div class="card">
                            <img src={s14} alt="s1" className="card-img-top" />
                            <div className="card-body">
                              <h5 className="card-title">Urology</h5>
                              <p className="card-text">₹600</p>
                              <a href="#">
                                Book now{" "}
                                <i
                                  class="fa fa-arrow-right"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
