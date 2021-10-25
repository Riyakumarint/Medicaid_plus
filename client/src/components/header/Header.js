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
        <Link to="#" className="avatar">
          <img src={user.avatar} alt="" /> {user.name}{" "}
          <i className="fas fa-angle-down"></i>
        </Link>
        <ul className="dropdown">
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </li>
    );
  };

  const transForm = {
    transform: isLogged ? "translateY(-5px)" : 0,
  };

  return (
    // <header>
      <div className="header ">
    <nav className="navbar navbar-expand-lg navbar-light  
    " >
      <Link to="/" className="logo">
        <h1
          className="navbar-brand text-uppercase p-0 m-0"
          onClick={() => window.scrollTo({ top: 0 })}
        >
          Medicare
        </h1>
      </Link>
          
          <button class="navbar-toggler justify-content-end" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse justify-content-end " id="navbarSupportedContent">
        <ul className="navbar-nav menu justify-content-end ms-auto">
          <NavLink
            exact
            to="/get_appointments"
            class="main-nav"
            activeStyle={{
              fontWeight: "bold",
              color: "white",
              opacity: "1",
            }}
          >
            Appoin
          </NavLink>
          <NavLink
            exact
            to="/find_video_consult"
            class="main-nav"
            activeStyle={{
              fontWeight: "bold",
              color: "white",
              opacity: "1",
            }}
          >
            Video
          </NavLink>
          <NavLink
            exact
            to="/find_lab_test"
            class="main-nav"
            activeStyle={{
              fontWeight: "bold",
              color: "white",
              opacity: "1",
            }}
          >
            Lab
          </NavLink>
          <NavLink
            exact
            to="/articles"
            class="main-nav"
            activeStyle={{
              fontWeight: "bold",
              color: "white",
              opacity: "1",
            }}
          >
            Articles
          </NavLink>
        

        <NavLink to="/" class="main-nav" style={transForm}>
          <i className="fas fa-bookmark"></i> Appoint
        </NavLink>
        {isLogged ? (
          userLink()
        ) : (
          <NavLink to="/login" class="main-nav" style={transForm}>
            <i className="fas fa-user"></i> Sign in
          </NavLink>
        )}
        </ul>
        </div>
         
          </nav>
</div>
    // </header>
  );
}

export default Header;
