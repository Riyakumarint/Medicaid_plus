import React from 'react'
import './home.css'
import Carousel1 from "../../../images/doc1.jpg";
import Carousel2 from "../../../images/doc2.jpg";
import Carousel3 from "../../../images/doc3.jpg";
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
                      <a href="/video_consult"><button className="btn" >Video Consult</button></a>
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
                    <a href="/appoinment_booking"><button className="btn btn-1">Book an appoinment</button></a>
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
                    <a href="/articles"><button className="btn btn-1">Read Articles</button></a>
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
          <div className="row">
            <div className="col-md-4">
              <div className="card-text-center">
                
              </div>
            </div>
          </div>
        </div>
        </div>
    )
}

export default Home