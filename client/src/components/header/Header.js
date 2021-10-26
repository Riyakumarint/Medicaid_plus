import { /*useContext,*/ useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function Header() {
  const auth = useSelector((state) => state.auth);
  const [menu, setMenu] = useState(false);

  const { user, isLogged } = auth;

  const handleLogout = async () => {
    try {
      await axios.get("/user/logout");
      localStorage.removeItem("firstLogin");
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };

  const userLink = () => {
    return (
      <li className="drop-nav">
        <NavLink to="#" className="avatar" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img className="avatar_user" src={user.avatar} alt="" />{" "}
          {user.username} <i className="fas fa-angle-down"></i>
        </NavLink>
<div className="dropdown">
        <ul className="dropmenu">
          <li className="dropdown-profile">
            <NavLink to="/profile" onClick={() => window.scrollTo({ top: 0 })}>Profile</NavLink>
          </li>
          <li className="dropdown-profile">
            <NavLink to="/" onClick={handleLogout}>
              Logout
            </NavLink>
          </li>
        </ul>
       </div>
      </li>
    );
  };

  const transForm = {
    transform: isLogged ? "translateY(-5px)" : 0,
  };

  return (
    <div className="header fixed-top">
      <div className="menu-bar">
        <nav
          className="navbar navbar-expand-lg navbar-light">
          <a href="/" className="navbar-brand">
            <h1 onClick={() => window.scrollTo({ top: 0 })}>Medicaid</h1>
          </a>

          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fa fa-bars"></i>
          </button>

          <div class="collapse navbar-collapse " id="navbarSupportedContent">
            <ul className="navbar-nav menu ml-auto">
              <NavLink
                exact
                to="/get_appointments"
                class="main-nav"
                activeStyle={{
                  fontWeight: "bold",
                  color: "white",
                }} onClick={() => window.scrollTo({ top: 0 })}
              >
                Get Appoinments
              </NavLink>
              <NavLink
                exact
                to="/find_video_consult"
                class="main-nav"
                activeStyle={{
                  fontWeight: "bold",
                  color: "white",
                }} onClick={() => window.scrollTo({ top: 0 })}
              >
                Video Consult
              </NavLink>
              <NavLink
                exact
                to="/find_lab_test"
                class="main-nav"
                activeStyle={{
                  fontWeight: "bold",
                  color: "white",
                }} onClick={() => window.scrollTo({ top: 0 })}
              >
                Lab tests
              </NavLink>
              <NavLink
                exact
                to="/articles"
                class="main-nav"
                activeStyle={{
                  fontWeight: "bold",
                  color: "white",
                }} onClick={() => window.scrollTo({ top: 0 })}
              >
                Articles
              </NavLink>

              <li className="nav-item dropdown" style={{ opacity: 1 }}>
                <div
                  className="dropdown"
                  style={{ transform: "translateX(75px)" }}
                >
                  {/* <NotifyModal /> */}
                </div>
              </li>

              {isLogged ? (
                userLink()
              ) : (
                <li style={transForm}>
                  <NavLink exact to="/login"class="main-nav"
                activeStyle={{
                  fontWeight: "bold",
                  color: "white",
                }} onClick={() => window.scrollTo({ top: 0 })}>
                    <i className="fas fa-user"></i> Sign in
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;


