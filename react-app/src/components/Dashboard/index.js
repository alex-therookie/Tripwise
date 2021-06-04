import React, { useState, useEffect } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-items">
        <h2>Dashboard</h2>
        <div className="dashboard-btn-wrapper">
          <button className="btn btn-large btn-green">Create trip</button>
          <button className="btn btn-large btn-green">Add an expense</button>
          <button className="btn btn-large btn-orange">Settle up</button>
        </div>
      </div>
      <div className="dashboard-balances">
        <div>total balance</div>
        <div id="balance-one">you owe</div>
        <div>you are owed</div>
      </div>
    </div>
  );
};

export default Dashboard;
