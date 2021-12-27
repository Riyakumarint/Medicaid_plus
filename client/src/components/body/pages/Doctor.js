import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactStars from "react-stars";
import Chat from "../../../images/chat.png";
import "./get.css";
import axios from "axios";
import CardVert from "../articles/CardVert";
import SideNav from "../profile/sidenav/SideNav";
import Comments from "../articles/Comment/Comments";

const initialState = {
  _id: "",
  name: "",
  userId: "",
  bloodGroup: "",
  age: "",
  speciality_name: "",
  city_name: "",
  clinic_address: "",
  experience_year: "",
  qualification: [],
  blogRecord: [],
  reviews: {
    rating: "",
    comments: [],
  },
  err: "",
  success: "",
};

const Doctor = () => {
  const [doctor, setDoctor] = useState(initialState);
  const history = useHistory();
  const [doctorUser, setDoctorUser] = useState({
    avatar: "",
    email: "",
    mobile: "",
    gender: "",
  });
  const [specialities, setSpecialities] = useState([]);
  const [speciality, setSpeciality] = useState({ speciality_name: "" });
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState({ city_name: "" });
  const [rating, setRating] = useState();
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState({ autherId: "" });
  const [callback, setCallback] = useState(false);

  const token = useSelector((state) => state.token);
  const { user, isLogged, isAdmin, isDoctor } = useSelector(
    (state) => state.auth
  );

  const { doctorId } = useParams();

  // data fetching
  useEffect(() => {
    window.scrollTo({ top: 0 });
    const getSpecialities = async () => {
      const res = await axios.get("/api/speciality");
      setSpecialities(res.data);
    };
    getSpecialities();
  }, [callback]);
  useEffect(() => {
    const getCities = async () => {
      const res = await axios.get("/api/city");
      setCities(res.data);
    };
    getCities();
  }, [callback]);

  useEffect(() => {
    const getDoctor = async () => {
      try {
        const res = await axios.get("/profiles/fetchDoctor/" + doctorId);
        setDoctor(res.data);

        res.data.reviews.rater.map((rater) => {
          if (rater.userId === user._id) {
            console.log("gotch");
            setRating(rater.rating);
          }
          console.log(rater.userId, user._id);
          return rater;
        });
      } catch (err) {
        console.log(err);
      }
    };
    getDoctor();
  }, [callback]);
  useEffect(() => {
    const getDoctorUser = async () => {
      try {
        const res = await axios.get("/user/fetchDoctorUser/" + doctorId);
        setDoctorUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getDoctorUser();
  }, [callback]);

  // Doctor Blogs
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const res = await axios.post("/profiles/fetchBlogs/", {
          autherId: doctorId,
        });

        setBlogs(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getBlogs();
  }, [callback]);

  // handle changes
  const handleRatingChange = async (e) => {
    const res = await axios.post(
      "/profiles/rateDoctor",
      { doctorId: doctorId, rating: e },
      { headers: { Authorization: token } }
    );
    setCallback(!callback);
  };

  // handle submit

  // renders
  const renderQualification = () => {
    if (doctor.qualification.length === 0) return "";
    return (
      <div>
        {doctor.qualification.map((qualification) => (
          <div>
            <h5>
              {qualification.major +
                " from " +
                qualification.college +
                " - " +
                qualification.passingyear}
            </h5>
          </div>
        ))}
      </div>
    );
  };

  const handleClick = async () => {
    const convo = {
      senderId: user._id,
      receiverId: doctorId,
    };

    try {
      const Conversation = await axios.post("/conversations", convo);
      // console.log(Conversation);
      history.push("/messenger");
    } catch (err) {
      console.log(err);
    }
  };

  // renders
  const renderBlogs = (blogs) => {
    if (blogs.length === 0) return "No Blogs Avilable";
    return (
      <div className="col-right">
        <div style={{ overflowX: "auto" }}>
          <div className="show_blogs">
            {blogs.map((blog) => (
              <CardVert key={blog._id} blog={blog} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <SideNav />
      <div className="continer-profile">
        <div className="pro">
          <div className="profile_page">
            <div className="profile_header">
              <div className="doc_avatar">
                <img src={doctorUser.avatar} alt="" />
              </div>
              <h3> {doctor.name}</h3>
              <ReactStars
                count={5}
                value={Number(doctor.reviews.rating)}
                size={24}
                color2={"#ffd700"}
                edit={false}
              />
              <button className="open-button" onClick={handleClick}>
                <img src={Chat} />
              </button>
            </div>

            <div className="profile-container">
              <div>
                <h5>
                  {" "}
                  {doctor.age} years old - {doctorUser.gender}
                </h5>
              </div>
              <div>{renderQualification()}</div>
              <div>
                <h5>
                  {" "}
                  Speciality -{" "}
                  {getSpecialityName(doctor.speciality_name, specialities)}
                </h5>
              </div>
              <div>
                <h5> Experience - {doctor.experience_year} years</h5>
              </div>
              <div>
                <h5> Clinic Address - {doctor.clinic_address}</h5>
              </div>
              <div>
                <h5>
                  Contact - {doctorUser.mobile}&nbsp; {doctorUser.email}
                </h5>
              </div>
              <hr></hr>
              <br></br>

              {/* blogs */}
              <div>
                <h5> Articles of this doctor goes here</h5>
                {renderBlogs(blogs)}
              </div>
              <hr></hr>
              <br></br>

              {/* comment and rating block */}
              {isLogged ? (
                <div>
                  <div>
                    <h5> Rate Doctor</h5>
                    <ReactStars
                      count={5}
                      value={rating}
                      onChange={handleRatingChange}
                      size={30}
                      color2={"#ffd700"}
                    />
                    <br></br>
                  </div>
                </div>
              ) : (
                ""
              )}
              <Comments blog={doctor} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Lenght = (symptoms) => symptoms.length;

const getSpecialityName = (_id, specialities) => {
  const spec = specialities.filter((speciality) => {
    return speciality._id === _id;
  });
  if (Lenght(spec) === 0) return "";
  return spec[0].name;
};
const getSpecialityFee = (_id, specialities) => {
  const spec = specialities.filter((speciality) => {
    return speciality._id === _id;
  });
  if (Lenght(spec) === 0) return "";
  return spec[0].fee;
};

export default Doctor;
