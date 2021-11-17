import React from "react";

function SideNav() {
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
            href="/medical_profile"
            onClick={() => window.scrollTo({ top: 0 })}
          >
            <span class="icon">
              <i class="fa fa-medkit" aria-hidden="true"></i>
            </span>
            <span class="title">Medical</span>
          </a>
        </li>
        <li>
          <a
            href="/medical_history"
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
          <a href="#" onClick={() => window.scrollTo({ top: 0 })}>
            <span class="icon">
              <i class="fa fa-list-alt" aria-hidden="true"></i>
            </span>
            <span class="title">Contact</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SideNav;
