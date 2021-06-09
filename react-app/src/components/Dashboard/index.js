import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Trips from "../Trips/index";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-items">
        <h2>Dashboard</h2>
        <div className="dashboard-btn-wrapper">
          <NavLink to={"/new-trip"}>
            <button className="btn btn-large btn-green">Plan a trip</button>
          </NavLink>
          <button className="btn btn-large btn-orange">Settle up</button>
        </div>
      </div>
      <div className="dashboard-balances">
        <div>
          <span>total balance</span>
          <br />
          <span id="total-balance">$66.93</span>
        </div>
        <div id="balance-one">
          <span>you owe</span>
          <br />
          <span id="you-owe">$123.97</span>
        </div>
        <div>
          <span>you are owed</span>
          <br />
          <span id="you-are-owed">$56.04</span>
        </div>
      </div>
      <Trips />
    </div>
  );
};

export default Dashboard;
