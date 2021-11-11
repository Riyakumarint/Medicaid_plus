import React, {useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {isLength, isMatch} from '../../utils/validation/Validation'


const initialState = {
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function ResetPassword() {
    const [data, setData] = useState(initialState)
    const {token} = useParams()
    const [typePass, setTypePass] = useState(false);
    const [typeCfPass, setTypeCfPass] = useState(false);
    
    const {password, cf_password, err, success} = data

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err: '', success: ''})
    }


    const handleResetPass = async () => {
        if(isLength(password))
            return setData({...data, err: "Password must be at least 6 characters.", success: ''})

        if(!isMatch(password, cf_password))
            return setData({...data, err: "Password did not match.", success: ''})
        
        try {
            const res = await axios.post('/user/reset', {password}, {
                headers: {Authorization: token}
            })

            return setData({...data, err: "", success: res.data.msg})

        } catch (err) {
            err.response.data.msg && setData({...data, err: err.response.data.msg, success: ''})
        }
        
    }


    return (

        <div className="container_sign">
      <div className="forms-container">
                <div className="signin-signup">
                    <form>
                         {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

        <h3 className="title">Reset Password</h3>
               
                <div className="form-group">
              <div className="input-field">
                <i class="fa fa-lock" aria-hidden="true"></i>
                <input
                  type={typePass ? "text" : "password"}
                  className="password"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={handleChangeInput}
                  value={password}
                  name="password"
                />

                <small className="hide" onClick={() => setTypePass(!typePass)}>
                  {typePass ? <i class="fa fa-eye-slash" aria-hidden="true"></i> : <i class="fa fa-eye" aria-hidden="true"></i>}
                </small>
             
              </div>
            </div>

            <div className="form-group">
              <div className="input-field">
                <i class="fa fa-key" aria-hidden="true"></i>
                <input
                  type={typeCfPass ? "text" : "password"}
                  className="cf_password"
                  id="cf_password"
                  placeholder="Confirm Password"
                  onChange={handleChangeInput}
                  value={cf_password}
                  name="cf_password"
                />

                <small
                  className="hide"
                  onClick={() => setTypeCfPass(!typeCfPass)}
                >
                  {typeCfPass ? <i class="fa fa-eye-slash" aria-hidden="true"></i> : <i class="fa fa-eye" aria-hidden="true"></i>}
                </small>

              </div>
            </div>
                    
                    <button
              type="submit"
              className="button" onClick={handleResetPass}
              
            >
              Reset Password
                    </button>
                    
                
            </form>
        </div></div></div>

    )
}

export default ResetPassword
