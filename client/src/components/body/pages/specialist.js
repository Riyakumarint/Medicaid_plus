import React from 'react'
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

function specialist() {
  return (
    <div className="container">
          
    
      <h1>Specialitists</h1>
      <div className="row">
      {/* <div className="col-md-12">
        <div id="inam" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active"> */}
              
              <div class="col s12 m6 l4">
                    <div class="card center-align">
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
                  <div class="col s12 m6 l4">
                    <div class="card center-align">
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
                  <div class="col s12 m6 l4">
                    <div class="card center-align">
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
                  <div class="col s12 m6 l4">
                    <div class="card center-align">
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
                  <div class="col s12 m6 l4">
                    <div class="card center-align">
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
                  <div class="col s12 m6 l4">
                    <div class="card center-align">
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
                  <div class="col s12 m6 l4">
                    <div class="card center-align">
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
                  <div class="col s12 m6 l4">
                    <div class="card center-align">
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
                  <div class="col s12 m6 l4">
                    <div class="card center-align">
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
                  <div class="col s12 m6 l4">
                    <div class="card center-align">
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
                  <div class="col s12 m6 l4">
                    <div class="card center-align">
                      <img src={s11} alt="s1" className="card-img-top" />
                      <div className="card-body">
                        <h5 className="card-title">
                        Gastroenterologist
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
                  <div class="col s12 m6 l4">
                    <div class="card center-align">
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
                  <div class="col s12 m6 l4">
                    <div class="card center-align">
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
                  <div class="col s12 m6 l4">
                    <div class="card center-align">
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
              
  )
}

export default specialist









{/* <div className="special">
        <div className="container-fluid">
          
          {/* <div className="row"> */}
        //   <h1>Specialitists</h1>
        //   <p className="content">
        //     {" "}
        //     Consult with top doctors across specialities
        //   </p>
            {/* <div className="col-md-12">
              <div id="inam" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                  <div class="carousel-item active"> */}
                    // <div class="container">
                    //   <div class="row">
                    //     <div class="col-sm-12 col-lg-4">
                    //       <div class="card">
                            {/* <div className="card text-center"> */}
            //                 <img src={s1} alt="s1" className="card-img-top" />
            //                 <div className="card-body">
            //                   <h5 className="card-title">Ayurveda</h5>
            //                   <p className="card-text">₹400</p>
            //                   <a href="#">
            //                     Book now{" "}
            //                     <i
            //                       class="fa fa-arrow-right"
            //                       aria-hidden="true"
            //                     ></i>
            //                   </a>
            //                 </div>
            //               </div>
            //             </div>
            //             <div class="col-sm-12 col-lg-4">
            //               <div class="card">
            //                 <img src={s2} alt="s1" className="card-img-top" />
            //                 <div className="card-body">
            //                   <h5 className="card-title">Cardiology</h5>
            //                   <p className="card-text">₹2500</p>
            //                   <a href="#">
            //                     Book now{" "}
            //                     <i
            //                       class="fa fa-arrow-right"
            //                       aria-hidden="true"
            //                     ></i>
            //                   </a>
            //                 </div>
            //               </div>
            //             </div>
            //             <div class="col-sm-12 col-lg-4">
            //               <div class="card">
            //                 <img src={s3} alt="s1" className="card-img-top" />
            //                 <div className="card-body">
            //                   <h5 className="card-title">Dermatology</h5>
            //                   <p className="card-text">₹1500</p>
            //                   <a href="#">
            //                     Book now{" "}
            //                     <i
            //                       class="fa fa-arrow-right"
            //                       aria-hidden="true"
            //                     ></i>
            //                   </a>
            //                 </div>
            //               </div>
            //             </div>
            //             <div class="col-sm-12 col-lg-4">
            //               <div class="card">
            //                 <img src={s4} alt="s1" className="card-img-top" />
            //                 <div className="card-body">
            //                   <h5 className="card-title">Gynecology</h5>
            //                   <p className="card-text">₹500</p>
            //                   <a href="#">
            //                     Book now{" "}
            //                     <i
            //                       class="fa fa-arrow-right"
            //                       aria-hidden="true"
            //                     ></i>
            //                   </a>
            //                 </div>
            //               </div>
            //             </div>
            //             <div class="col-sm-12 col-lg-4">
            //               <div class="card">
            //                 <img src={s5} alt="s1" className="card-img-top" />
            //                 <div className="card-body">
            //                   <h5 className="card-title">Ophthalmology</h5>
            //                   <p className="card-text">₹350</p>
            //                   <a href="#">
            //                     Book now{" "}
            //                     <i
            //                       class="fa fa-arrow-right"
            //                       aria-hidden="true"
            //                     ></i>
            //                   </a>
            //                 </div>
            //               </div>
            //             </div>
            //             <div class="col-sm-12 col-lg-4">
            //               <div class="card">
            //                 <img src={s6} alt="s1" className="card-img-top" />
            //                 <div className="card-body">
            //                   <h5 className="card-title">Orthopedic</h5>
            //                   <p className="card-text">₹530</p>
            //                   <a href="#">
            //                     Book now{" "}
            //                     <i
            //                       class="fa fa-arrow-right"
            //                       aria-hidden="true"
            //                     ></i>
            //                   </a>
            //                 </div>
            //               </div>
            //             </div>
            //             <div class="col-sm-12 col-lg-4">
            //               <div class="card">
            //                 <img src={s7} alt="s1" className="card-img-top" />
            //                 <div className="card-body">
            //                   <h5 className="card-title">Padiatrics</h5>
            //                   <p className="card-text">₹900</p>
            //                   <a href="#">
            //                     Book now{" "}
            //                     <i
            //                       class="fa fa-arrow-right"
            //                       aria-hidden="true"
            //                     ></i>
            //                   </a>
            //                 </div>
            //               </div>
            //             </div>
            //             <div class="col-sm-12 col-lg-4">
            //               <div class="card">
            //                 <img src={s8} alt="s1" className="card-img-top" />
            //                 <div className="card-body">
            //                   <h5 className="card-title">Psychiatry</h5>
            //                   <p className="card-text">₹1500</p>
            //                   <a href="#">
            //                     Book now{" "}
            //                     <i
            //                       class="fa fa-arrow-right"
            //                       aria-hidden="true"
            //                     ></i>
            //                   </a>
            //                 </div>
            //               </div>
            //             </div>
            //             <div class="col-sm-12 col-lg-4">
            //               <div class="card">
            //                 <img src={s9} alt="s1" className="card-img-top" />
            //                 <div className="card-body">
            //                   <h5 className="card-title">Sexology</h5>
            //                   <p className="card-text">₹800</p>
            //                   <a href="#">
            //                     Book now{" "}
            //                     <i
            //                       class="fa fa-arrow-right"
            //                       aria-hidden="true"
            //                     ></i>
            //                   </a>
            //                 </div>
            //               </div>
            //             </div>
            //             <div class="col-sm-12 col-lg-4">
            //               <div class="card">
            //                 <img src={s10} alt="s1" className="card-img-top" />
            //                 <div className="card-body">
            //                   <h5 className="card-title">General Physician</h5>
            //                   <p className="card-text">₹300</p>
            //                   <a href="#">
            //                     Book now{" "}
            //                     <i
            //                       class="fa fa-arrow-right"
            //                       aria-hidden="true"
            //                     ></i>
            //                   </a>
            //                 </div>
            //               </div>
            //             </div>
            //             <div class="col-sm-12 col-lg-4">
            //               <div class="card">
            //                 <img src={s11} alt="s1" className="card-img-top" />
            //                 <div className="card-body">
            //                   <h5 className="card-title">
            //                   Gastroenterologist
            //                   </h5>
            //                   <p className="card-text">₹300</p>
            //                   <a href="#">
            //                     Book now{" "}
            //                     <i
            //                       class="fa fa-arrow-right"
            //                       aria-hidden="true"
            //                     ></i>
            //                   </a>
            //                 </div>
            //               </div>
            //             </div>
            //             <div class="col-sm-12 col-lg-4">
            //               <div class="card">
            //                 <img src={s12} alt="s1" className="card-img-top" />
            //                 <div className="card-body">
            //                   <h5 className="card-title">surgeon</h5>
            //                   <p className="card-text">₹8500</p>
            //                   <a href="#">
            //                     Book now{" "}
            //                     <i
            //                       class="fa fa-arrow-right"
            //                       aria-hidden="true"
            //                     ></i>
            //                   </a>
            //                 </div>
            //               </div>
            //             </div>
            //             <div class="col-sm-12 col-lg-4">
            //               <div class="card">
            //                 <img src={s13} alt="s1" className="card-img-top" />
            //                 <div className="card-body">
            //                   <h5 className="card-title">Dentist</h5>
            //                   <p className="card-text">₹450</p>
            //                   <a href="#">
            //                     Book now{" "}
            //                     <i
            //                       class="fa fa-arrow-right"
            //                       aria-hidden="true"
            //                     ></i>
            //                   </a>
            //                 </div>
            //               </div>
            //             </div>
            //             <div class="col-sm-12 col-lg-4">
            //               <div class="card">
            //                 <img src={s14} alt="s1" className="card-img-top" />
            //                 <div className="card-body">
            //                   <h5 className="card-title">Urology</h5>
            //                   <p className="card-text">₹600</p>
            //                   <a href="#">
            //                     Book now{" "}
            //                     <i
            //                       class="fa fa-arrow-right"
            //                       aria-hidden="true"
            //                     ></i>
            //                   </a>
            //                 </div>
            //               </div>
            //             </div>
            //           </div>
            //         </div>
            //       </div>
            //     </div>
            //   </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div> */}














    <div className="container-fluid">
          
          {/* <div className="row"> */}
          <h1>Specialitists</h1>
          <p className="content">
            {" "}
            Consult with top doctors across specialities
          </p>
            {/* <div className="col-md-12">
              <div id="inam" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                  <div class="carousel-item active"> */}
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
                              Gastroenterologist
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