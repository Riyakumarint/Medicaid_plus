import React from "react";

function SideNav() {
  return (
    <>
      <input type="checkbox" id="check"/>
      <div id="mySidenav" className="sidebar fixed-left">
        <label for="check" >
          <i class="fas fa-plus-circle" id="sidebar_btn"></i>
        </label>
        <div className="divider"></div>
        <a href="/profile" onClick={() => window.scrollTo({ top: 0 })}>
          <i class="fa fa-medkit" aria-hidden="true"></i>
          <span>Profile</span>
        </a>

        <a href="/patient_profile" onClick={() => window.scrollTo({ top: 0 })}>
          <i class="fa fa-product-hunt" aria-hidden="true"></i>
          <span>Patient</span>
        </a>

        <a href="/patient_profile" onClick={() => window.scrollTo({ top: 0 })}>
          <i class="fa fa-history" aria-hidden="true"></i>
          <span>History</span>
        </a>

        <a href="#" onClick={() => window.scrollTo({ top: 0 })}>
          {" "}
          <i class="fa fa-address-card" aria-hidden="true"></i>
          <span>Appointment</span>
        </a>

        <a href="#" onClick={() => window.scrollTo({ top: 0 })}>
          {" "}
          <i class="fa fa-commenting-o" aria-hidden="true"></i>
          <span>Clients</span>
        </a>

        <a href="#" onClick={() => window.scrollTo({ top: 0 })}>
          {" "}
          <i class="fa fa-list-alt" aria-hidden="true"></i>
          <span>Contact</span>
        </a>
      </div>
    </>
  );
}

export default SideNav;
