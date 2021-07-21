import React from "react";
import { useLocation } from "react-router-dom";
import "./Footer.css";
import devPic from "../../images/alex.jpg";

const Footer = () => {
  const location = useLocation();
  if (["/login", "/sign-up", "/new-trip"].includes(location.pathname)) {
    return null;
  }
  return (
    <>
      <div className="main-footer">
        <div className="footer-container">
          <div className="dev-profile">
            <div className="pic-container">
              <img alt="dev-pic" className="dev-pic" src={devPic}></img>
            </div>
            <div className="dev-details">
              <h3>Alex Rodriguez</h3>
              <a href="https://github.com/alex-therookie">Github</a>
              {" | "}
              <a href="https://www.linkedin.com/in/alex-rodriguez-8a8aa1146/">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
