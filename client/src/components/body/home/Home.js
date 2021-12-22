import React, { useState, useEffect }  from "react";
import Card from './Cards'
import "./home.css";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import Sdata from './Sdata'
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
  const [speciality, setSpeciality] = useState("");
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
                      <a href="/find_video_consult">
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
                      <a href="/create_appointments">
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
          <Card
          imgsrc={Sdata[0].imgsrc}
          title={Sdata[0].title}
          price={Sdata[0].price}
          link={Sdata[0].link}
        />
          </Item>
          <Item>
          <Card
          imgsrc={Sdata[1].imgsrc}
          title={Sdata[1].title}
          price={Sdata[1].price}
          link={Sdata[1].link}
        />
          </Item>
          <Item>
          <Card
          imgsrc={Sdata[2].imgsrc}
          title={Sdata[2].title}
          price={Sdata[2].price}
          link={Sdata[2].link}
        />
          </Item>
          <Item>
          <Card
          imgsrc={Sdata[3].imgsrc}
          title={Sdata[3].title}
          price={Sdata[3].price}
          link={Sdata[3].link}
        />
          </Item>
          <Item>
          <Card
          imgsrc={Sdata[4].imgsrc}
          title={Sdata[4].title}
          price={Sdata[4].price}
          link={Sdata[4].link}
        />
          </Item>
          <Item>
          <Card
          imgsrc={Sdata[5].imgsrc}
          title={Sdata[5].title}
          price={Sdata[5].price}
          link={Sdata[5].link}
        />
          </Item>
          <Item>
          <Card
          imgsrc={Sdata[6].imgsrc}
          title={Sdata[6].title}
          price={Sdata[6].price}
          link={Sdata[6].link}
        />
          </Item>
          <Item>
          <Card
          imgsrc={Sdata[7].imgsrc}
          title={Sdata[7].title}
          price={Sdata[7].price}
          link={Sdata[7].link}
        />
          </Item>
          <Item>
          <Card
          imgsrc={Sdata[8].imgsrc}
          title={Sdata[8].title}
          price={Sdata[8].price}
          link={Sdata[8].link}
        />
          </Item>
          <Item>
          <Card
          imgsrc={Sdata[9].imgsrc}
          title={Sdata[9].title}
          price={Sdata[9].price}
          link={Sdata[9].link}
        />
          </Item>
          <Item>
          <Card
          imgsrc={Sdata[10].imgsrc}
          title={Sdata[10].title}
          price={Sdata[10].price}
          link={Sdata[10].link}
        />
          </Item>
          <Item>
          <Card
          imgsrc={Sdata[0].imgsrc}
          title={Sdata[0].title}
          price={Sdata[0].price}
          link={Sdata[0].link}
        />
          </Item>
          <Item>
          <Card
          imgsrc={Sdata[11].imgsrc}
          title={Sdata[11].title}
          price={Sdata[11].price}
          link={Sdata[11].link}
        />
          </Item>
          <Item>
          <Card
          imgsrc={Sdata[12].imgsrc}
          title={Sdata[12].title}
          price={Sdata[12].price}
          link={Sdata[12].link}
        />
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
