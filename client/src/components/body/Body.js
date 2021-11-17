import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ActivationEmail from "./auth/ActivationEmail";
import NotFound from "../utils/NotFound/NotFound";
import ForgotPass from "../body/auth/ForgotPassword";
import ResetPass from "../body/auth/ResetPassword";
import Profile from "../body/profile/Profile";
import EditUser from "../body/profile/EditUser";
import Medical_profile from './profile/Medical_Profile'
import Medical_history from './profile/Medical_History'
import Dash_board from '../body/profile/dash_board'
import Home from "../body/home/Home";
import Appoinment from '../body/pages/Appointment'
import VideoConsult from '../body/pages/VideoConsult'
import LabTest from '../body/pages/LabTest'
import specialist from '../body/pages/specialist'
import { useSelector } from "react-redux";

function Body() {
  const auth = useSelector((state) => state.auth);
  const { isLogged, isAdmin } = auth;
  return (
    <section>
      <Switch>
        <Route path="/" component={Home} exact />
        {/* <Route exact path="/" component={auth.token ? Home : Login} /> */}
        <Route path="/login" component={isLogged ? NotFound : Login} exact />
        <Route
          path="/register"
          component={isLogged ? NotFound : Register}
          exact
        />

        <Route
          path="/forgot_password"
          component={isLogged ? NotFound : ForgotPass}
          exact
        />
        <Route
          path="/user/reset/:token"
          component={isLogged ? NotFound : ResetPass}
          exact
        />

        <Route
          path="/user/activate/:activation_token"
          component={ActivationEmail}
          exact
        />

        <Route
          path="/profile"
          component={isLogged ? Profile : NotFound}
          exact
        />
        <Route
          path="/medical_profile"
          component={isLogged ? Medical_profile : NotFound}
          exact
        />
        <Route
          path="/medical_history"
          component={isLogged ? Medical_history : NotFound}
          exact
        />
        <Route
          path="/dash_board"
          component={isLogged ? Dash_board : NotFound}
          exact
        />
        <Route
          path="/edit_user/:id"
          component={isAdmin ? EditUser : NotFound}
          exact
        />

        <Route path="/get_appointments" component={Appoinment} />
        <Route path="/find_video_consult" component={VideoConsult} />
        <Route path="/find_lab_test" component={LabTest} />
        <Route path="/specialist" component={specialist} />

        <Route path="*" exact component={NotFound}/>
        {/* <Route path="/product" component={Product} /> */}
      </Switch>
    </section>
  );
}

export default Body;
