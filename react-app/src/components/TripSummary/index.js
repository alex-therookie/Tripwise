import React from "react";
import {} from "react-redux";
import { useHistory } from "react-router-dom";
import "./TripSummary.css";

const TripSummary = ({ trip }) => {
  const history = useHistory();
  const handleClick = (tripId) => {
    history.push(`/trips/${tripId}`);
  };
  return (
    <div className="trip-summary" onClick={() => handleClick(trip.id)}>
      <div className="trip-header trip-details">
        <h3>{trip.name}</h3>
      </div>
      <div className="trip-balance trip-details"></div>
    </div>
  );
};

export default TripSummary;
