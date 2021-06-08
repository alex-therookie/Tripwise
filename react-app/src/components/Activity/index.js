import React, { useEffect, useState } from "react";
import "./Activity.css";

const Activity = ({ activity }) => {
  const [openActivity, setOpenActivity] = useState(false);
  const handleClick = () => {
    setOpenActivity(!openActivity);
  };

  return (
    <div className="activity-container" onClick={handleClick}>
      <div className="activity-summary">
        <div className="activity-date activity-details">July 4</div>
        <div className="activity-img activity-details">photo</div>
        <div className="activity-name activity-details">
          <h3>{activity.name}</h3>
        </div>
        <div className="activity-balance activity-details">$120.00</div>
      </div>
      <div
        className={openActivity ? "activity-detail" : "activity-detail hidden"}
      >
        <h4>{activity.name}</h4>
        <h5>{activity.date}</h5>
      </div>
    </div>
  );
};

export default Activity;
