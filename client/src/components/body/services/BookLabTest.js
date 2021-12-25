import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import SideNav from "../profile/sidenav/SideNav";
import {
  showSuccessMsg,
  showErrMsg,
} from "../../utils/notification/Notification";

const initialState = {
  name: "",
  medicalId: "",
  patientID: "",
  testName: "",
  mobile: "",
  address: "",
  status: "Sample pickup is scheduled",
};

function BookLabTest() {
  const { medicalId } = useParams();
  const history = useHistory();

  const [bookingDetail, setBookingDetail] = useState(initialState);
  const [callback, setCallback] = useState(false);
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);

  const token = useSelector((state) => state.token);
  const { user } = useSelector((state) => state.auth);

  // Fetch data
  useEffect(() => {
    window.scrollTo({ top: 0 });
    setBookingDetail({
      ...bookingDetail,
      name: user.name,
      medicalId: medicalId,
      patientID: user._id,
      mobile: user.mobile,
      address: user.address,
    });
  }, [callback, user, medicalId]);

  // handle change
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setBookingDetail({ ...bookingDetail, [name]: value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/services/labtest",
        { bookingDetail },
        { headers: { Authorization: token } }
      );

      setSuccess(res.data.msg);
      setTimeout(() => {
        history.push("/find_lab_test");
      }, 2000);
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  return (
    <>
      <SideNav />
      <div className="continer-profile">
        <div className="pro">
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}
          <form onSubmit={handleSubmit}>
            <div className="profile_page">
              <div className="profile_header">
                <h4>Book Lab Test</h4>
                <button
                  type="submit"
                  className="button"
                  onClick={() => window.scrollTo({ top: 0 })}
                >
                  Book
                </button>
              </div>

              {/* general block */}
              <div className="profile-container">
                <div className="row">
                  <div class="col s12 m6 l4">
                    <div className="form-group">
                      <div className="input-field">
                        <label htmlFor="name">Name</label>
                        <input
                          className="name"
                          id="exampleInputname1"
                          placeholder="name"
                          onChange={handleChangeInput}
                          value={bookingDetail.name}
                          name="name"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col s12 m6 l4">
                    <div className="form-group">
                      <div className="input-field">
                        <label htmlFor="testName">Test</label>
                        <input
                          className="name"
                          id="exampleInputTestName1"
                          placeholder="Test name"
                          onChange={handleChangeInput}
                          value={bookingDetail.testName}
                          name="testName"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div class="col s12 m6 l4">
                    <div className="form-group">
                      <div className="input-field">
                        <label htmlFor="mobile">mobile</label>
                        <input
                          className="mobile"
                          id="exampleInputmobile1"
                          placeholder="mobile"
                          onChange={handleChangeInput}
                          value={bookingDetail.mobile}
                          name="mobile"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col s12 m6 l4">
                    <div className="form-group">
                      <div className="input-field">
                        <label htmlFor="address">Address</label>
                        <input
                          className="name"
                          id="exampleInputAddress1"
                          placeholder="Address"
                          onChange={handleChangeInput}
                          value={bookingDetail.address}
                          name="address"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default BookLabTest;
