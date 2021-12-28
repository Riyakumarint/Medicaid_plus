import React from "react";
import { useSelector } from "react-redux";

function SideNav() {
  const auth = useSelector((state) => state.auth);
  const { isAdmin, isDoctor } = auth;

  return (
    <div id="mySidenav" className="sidebar fixed-left">
      <ul>
        <li>
          <a href="/dash_board" onClick={() => window.scrollTo({ top: 0 })}>
            <span class="icon">
              <i class="fas fa-columns" aria-hidden="true"></i>
            </span>
            <span class="title">Dash board</span>
          </a>
        </li>

        <li>
          <a href="/profile" onClick={() => window.scrollTo({ top: 0 })}>
            <span class="icon">
              <i class="fa fa-product-hunt" aria-hidden="true"></i>
            </span>
            <span class="title">Profile</span>
          </a>
        </li>
        <li>
          <a
            href={isDoctor ? "/medical_profile" : "/medical_history"}
            onClick={() => window.scrollTo({ top: 0 })}
          >
            <span class="icon">
              <i class="fa fa-medkit" aria-hidden="true"></i>
            </span>
            <span class="title">Medical</span>
          </a>
        </li>
        <li>
          {isDoctor ? (
            <a
              href={isDoctor ? "/medical_history" : ""}
              onClick={() => window.scrollTo({ top: 0 })}
            >
              <span class="icon">
                <i class="fa fa-medkit" aria-hidden="true"></i>
              </span>
              <span class="title">History</span>
            </a>
          ) : (
            ""
          )}
        </li>
        <li>
          <a
            href="/get_appointments"
            onClick={() => window.scrollTo({ top: 0 })}
          >
            <span class="icon">
              <i class="fa fa-address-card" aria-hidden="true"></i>
            </span>
            <span class="title">Appointments</span>
          </a>
        </li>
        <li>
          <a href="/messenger" onClick={() => window.scrollTo({ top: 0 })}>
            <span class="icon">
              <i class="fas fa-comments" aria-hidden="true"></i>
            </span>
            <span class="title">Chats</span>
          </a>
        </li>

        <li>
          {isDoctor ? (
            <a href="/create_blog" onClick={() => window.scrollTo({ top: 0 })}>
              <span class="icon">
                <i class="fa fa-newspaper-o" aria-hidden="true"></i>
              </span>
              <span class="title">Articles</span>
            </a>
          ) : (
            ""
          )}
        </li>
        <li>
          {isAdmin ? (
            <a href="/speciality" onClick={() => window.scrollTo({ top: 0 })}>
              <span class="icon">
                <i class="fa fa-user-md" aria-hidden="true"></i>
              </span>
              <span class="title">Speciality</span>
            </a>
          ) : (
            ""
          )}
        </li>
        <li>
          {isAdmin ? (
            <a href="/city" onClick={() => window.scrollTo({ top: 0 })}>
              <span class="icon">
                <i class="fas fa-city" aria-hidden="true"></i>
              </span>
              <span class="title">City</span>
            </a>
          ) : (
            ""
          )}
        </li>

        <li>
          {isDoctor ? (
            <a href="/createSlot" onClick={() => window.scrollTo({ top: 0 })}>
              <span class="icon">
                <i class="fas fa-calendar" aria-hidden="true"></i>
              </span>
              <span class="title">Create Slots</span>
            </a>
          ) : (
            ""
          )}
        </li>
        <li>
          {isDoctor ? (
            <a href="/services" onClick={() => window.scrollTo({ top: 0 })}>
              <span class="icon">
                <i class="fas fa-hand-holding-medical" aria-hidden="true"></i>
              </span>
              <span class="title">Services</span>
            </a>
          ) : (
            ""
          )}
        </li>
        <li>
          {isAdmin ? (
            <a href="/category" onClick={() => window.scrollTo({ top: 0 })}>
              <span class="icon">
                <i class="fa fa-calendar-plus-o" aria-hidden="true"></i>
              </span>
              <span class="title">Category</span>
            </a>
          ) : (
            <a href="/contact_us" onClick={() => window.scrollTo({ top: 0 })}>
              <span class="icon">
                <i class="fas fa-envelope"></i>
              </span>
              <span class="title">Contact</span>
            </a>
          )}
        </li>
      </ul>
    </div>
  );
}

export default SideNav;
