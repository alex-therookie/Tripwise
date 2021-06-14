import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { useSelector } from "react-redux";
import "./NavBar.css";
import tripwiseLogo from "../../images/Tripwiselogo.png";
// testing
const NavBar = () => {
  const [menuClicked, setMenuClicked] = useState(false);
  const user = useSelector((state) => state.session.user);

  return (
    <nav className="nav-container">
      <div className="nav-menu-logo">
        {/* <div
          className="nav-menu-icon"
          onClick={() => setMenuClicked(!menuClicked)}
        >
          <i className={menuClicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div> */}
        <img className="nav-img-logo" src={tripwiseLogo} />
        <div className="nav-logo">
          <Link to="/" exact={true} style={{ textDecoration: "none" }}>
            <h2>Tripwise</h2>
          </Link>
        </div>
      </div>
      <ul className={menuClicked ? "nav-menu-items active" : "nav-menu-items"}>
        {!user ? (
          <>
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
          </>
        ) : (
          <>
            <li className="nav-profile nav-menu-item">{user.username}</li>
            <li>
              <LogoutButton />
            </li>
          </>
        )}
        {/* <li>
          <NavLink
            to="/users"
            exact={true}
            activeClassName="active"
            className="nav-menu-item"
          >
            Users
          </NavLink>
        </li> */}
      </ul>
      {/* <ul className={menuClicked ? "nav-drawer active" : "nav-drawer"}>
        <li className="nav-drawer-links">Dashboard</li>
        <li className="nav-drawer-links">Expenses</li>
        <li className="nav-drawer-links">Trips</li>
        <li className="nav-drawer-links">
          <NavLink className="friends" to={"/friends"}>
            Friends
          </NavLink>
        </li>
      </ul> */}
    </nav>
  );
};

export default NavBar;
