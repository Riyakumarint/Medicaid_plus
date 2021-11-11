import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";

const initialState = {
  bloodGroup: "",
  age: "",
  err: "",
  success: "",
};

const Patient_profile = () => {
  const [profile, setProfile] = useState(initialState);
  const token = useSelector(state => state.token)
  const history = useHistory();

  const { bloodGroup, age, err, success } = profile;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/profiles/createMedicalProfile", { bloodGroup, age },{
        headers: {Authorization: token}
    })

      setProfile({ ...profile, err: "", success: res.data.msg });

      

    
      history.push("/");
    } catch (err) {
      setProfile({ ...profile, err: err.response.data.msg, success: "" });
    }
  };

  return (
      <div className="container_sign Patient_profile">
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleSubmit}>
            
            <h3 className="title">Edit Profile</h3>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            <div className="form-group">
              <div className="input-field">
              <i class="fa fa-tint" aria-hidden="true"></i>
                <input
                  type="bloodGroup"
                  className="bloodGroup"
                  id="exampleInputtest"
                  aria-describedby="bloodGroup"
                  placeholder="bloodGroup"
                  onChange={handleChangeInput}
                  name="bloodGroup"
                  value={bloodGroup}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-field">
                <i className="fa fa-user-plus" aria-hidden="true"></i>
                <input
                  className="age"
                  id="exampleInputage1"
                  placeholder="age"
                  onChange={handleChangeInput}
                  value={age}
                  name="age"
                />
                
              </div>
            </div>
            <button
              type="submit"
              className="button"
              disabled={bloodGroup && age ? false : true}
              onClick={() => window.scrollTo({ top: 0 })}
            >
              Profile
            </button>

            
            

            
            
          </form>
        </div>
      </div>
    </div>

   
  )
}

export default Patient_profile