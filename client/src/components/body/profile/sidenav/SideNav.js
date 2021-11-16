import React from "react";
// import axios from "axios";
import { useSelector } from "react-redux";

function SideNav() {
  const auth = useSelector((state) => state.auth);
  
  // const users = useSelector((state) => state.users);
  // const [callback, setCallback] = useState(false);

  // const dispatch = useDispatch();

  const { isAdmin } = auth;
  return (
    <div id="mySidenav" className="sidebar fixed-left">
      <ul>
        <li>
          <a href="/profile" onClick={() => window.scrollTo({ top: 0 })}>
            <span class="icon">
              <i class="fa fa-medkit" aria-hidden="true"></i>
            </span>
            <span class="title">Profile</span>
          </a>
        </li>
        <li>
          <a
            href="/patient_profile"
            onClick={() => window.scrollTo({ top: 0 })}
          >
            <span class="icon">
              <i class="fa fa-product-hunt" aria-hidden="true"></i>
            </span>
            <span class="title">Patient</span>
          </a>
        </li>
        <li>
          <a
            href="/patient_profile"
            onClick={() => window.scrollTo({ top: 0 })}
          >
            <span class="icon">
              <i class="fa fa-history" aria-hidden="true"></i>
            </span>
            <span class="title">History</span>
          </a>
        </li>
        <li>
          <a href="#" onClick={() => window.scrollTo({ top: 0 })}>
            <span class="icon">
              <i class="fa fa-address-card" aria-hidden="true"></i>
            </span>
            <span class="title">Appointment</span>
          </a>
        </li>
        <li>
          <a href="#" onClick={() => window.scrollTo({ top: 0 })}>
            <span class="icon">
              <i class="fa fa-commenting-o" aria-hidden="true"></i>
            </span>
            <span class="title">Clients</span>
          </a>
        </li>
        <li>
          <a href="/create_blog" onClick={() => window.scrollTo({ top: 0 })}>
            <span class="icon">
              <i class="fa fa-newspaper-o" aria-hidden="true"></i>
            </span>
            <span class="title">Articles</span>
          </a>
        </li>
        <li>
        {isAdmin ? <a href="/speciality" onClick={() => window.scrollTo({ top: 0 })}>
            <span class="icon">
              <i class="fa fa-user-md" aria-hidden="true"></i>
            </span>
            <span class="title">Create S</span>
          </a>
            :
          ''
        }
        </li>
        <li>
        {isAdmin ? <a href="/category" onClick={() => window.scrollTo({ top: 0 })}>
            <span class="icon">
              <i class="fa fa-calendar-plus-o" aria-hidden="true"></i>
            </span>
            <span class="title">Create C</span>
          </a>
            :
          <a href="#" onClick={() => window.scrollTo({ top: 0 })}>
            <span class="icon">
              <i class="fa fa-list-alt" aria-hidden="true"></i>
            </span>
            <span class="title">Contact</span>
          </a>
        }
        </li>
      </ul>
    </div>
  );
}

export default SideNav;
