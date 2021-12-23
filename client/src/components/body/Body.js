import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ActivationEmail from "./auth/ActivationEmail";
import NotFound from "../utils/NotFound/NotFound";
import ForgotPass from "../body/auth/ForgotPassword";
import ResetPass from "../body/auth/ResetPassword";
import Profile from "../body/profile/Profile";
import Category from "./pages/Categories";
import Speciality from "./pages/Speciality";
import City from "./pages/City";
import EditUser from "../body/profile/EditUser";
import Medical_profile from './profile/Medical_Profile'
import Medical_history from './profile/Medical_History'
import Dash_board from '../body/profile/dash_board'
import Create_blog from "./pages/Create_blog";
import Contact from "./pages/Contact";
import Home from "../body/home/Home";
import Appointments from "./pages/Appointments";
import Appointment_doctor from "./pages/Appointment_doctor";
import Appointment_patient from "./pages/Appointment_patient";
import Create_appointment from "../body/pages/Create_appointment";
import Articles from "../body/articles/Articles"
import ArticlePage from "../body/articles/ArticlePage"
import Find_doctor from "../body/pages/Find_doctor";
import Doctor from "../body/pages/Doctor";
import LabTest from "../body/pages/LabTest";
import Specialist from "../body/pages/Specialist";
import Messenger from "./messenger/Messenger.js"
import { useSelector } from "react-redux";

function Body() {
  const auth = useSelector((state) => state.auth);
  const { isLogged, isAdmin, isDoctor } = auth;

  // const appointment = ()=>{
  //   if(isLogged && isDoctor){
  //     return Appointment_doctor
  //   } else if(isLogged){
  //     Appointment_patient
  //   } else{
  //     Login
  //   }
  // }

  return (
    <section>
      <Switch>
        <Route path="/" component={Home} exact />
        {/* <Route exact path="/" component={auth.token ? Home : Login} /> */}
        <Route 
          path="/login" 
          component={isLogged ? NotFound : Login} 
          exact 
        />

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
          component={isLogged ? Profile : Login}
          exact
        />
        <Route
          path="/medical_profile"
          component={isLogged ? Medical_profile : Login}
          exact
        />
        <Route
          path="/medical_history"
          component={isLogged ? Medical_history : Login}
          exact
        />
        <Route
          path="/dash_board"
          component={isLogged ? Dash_board : Login}
          exact
        />
        <Route
          path="/create_blog"
          component={isLogged ? Create_blog : Login}
          exact
        />
        <Route
          path="/edit_user/:id"
          component={isAdmin ? EditUser : Login}
          exact
        />
        <Route
          path="/category"
          component={isLogged ? Category : Login}
          exact
        />
        <Route
          path="/speciality"
          component={isLogged ? Speciality : Login}
          exact
        />
        <Route
          path="/city"
          component={isLogged ? City : Login}
          exact
        />
        <Route
          path="/create_appointments"
          component={isLogged ? Create_appointment : Login}
          exact
        />
        <Route
          path="/get_appointments"
          component={isLogged ? Appointments : Login}
          exact
        />
        <Route
          path="/appointment/:caseId"
          component={isLogged&&isDoctor ? Appointment_doctor : Appointment_patient}
          exact
        />
        <Route
          path="/messenger"
          component={isLogged ? Messenger : Login}
          exact
        />
        <Route 
          path="/find_doctor" 
          component={Find_doctor} 
          exact
        />
        <Route
          path="/doctor/:doctorId"
          component={Doctor}
          exact
        />
        <Route path="/find_lab_test" component={LabTest} />
        <Route path="/specialist" component={Specialist} />
        <Route path="/articles" component={Articles} />
        <Route path="/detail/:id" component={ArticlePage} />
        <Route
          path="/contact_us"
          component={isLogged ? Contact : Login}
          exact
        />
       
        <Route path="*" exact component={NotFound} />
      </Switch>
    </section>
  );
}

export default Body;