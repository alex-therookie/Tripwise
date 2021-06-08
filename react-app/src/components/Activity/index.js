import React, { useEffect, useState } from "react";
import "./Activity.css";

const Activity = ({ activity }) => {
  return (
    <div className="activity-container">
      <div className="activity-date activity-details">July 4</div>
      <div className="activity-img activity-details">photo</div>
      <div className="activity-name activity-details">
        <h3>{activity.name}</h3>
      </div>
      <div className="activity-balance activity-details">$120.00</div>
    </div>
  );
};

export default Activity;
