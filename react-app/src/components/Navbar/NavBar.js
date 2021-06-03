import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "./NavBar.css";
// testing
const NavBar = () => {
  const [menuClicked, setMenuClicked] = useState(false);

  return (
    <nav className="nav-container">
      <div className="nav-logo">
        <NavLink to="/" exact={true} activeClassName="active">
          <h2 className="nav-logo">Home</h2>
        </NavLink>
      </div>
      <div
        className="nav-menu-icon"
        onClick={() => setMenuClicked(!menuClicked)}
      >
        <i className={menuClicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={menuClicked ? "nav-menu-items active" : "nav-menu-items"}>
        <li>
          <NavLink
            to="/login"
            exact={true}
            activeClassName="active"
            className="nav-menu-item"
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sign-up"
            exact={true}
            activeClassName="active"
            className="nav-menu-item"
          >
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/users"
            exact={true}
            activeClassName="active"
            className="nav-menu-item"
          >
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
