import React, { useState, useEffect } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-items">
        <h2>Dashboard</h2>
        <div className="dashboard-btn-wrapper">
          <button>Create Trip</button>
          <button>Add Expense</button>
          <button>Settle Up</button>
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
