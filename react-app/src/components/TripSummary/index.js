import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getTrip } from "../../store/trip";
import "./TripSummary.css";

const TripSummary = ({ trip }) => {
  const history = useHistory();
  const handleClick = (tripId) => {
    history.push(`/trips/${tripId}`);
  };
  return (
    <div className="trip-summary" onClick={() => handleClick(trip.id)}>
      <div className="trip-date trip-details">July 4</div>
      <div className="trip-photo trip-details">photo</div>
      <div className="trip-header trip-details">
        <h3>{trip.name}</h3>
      </div>
      <div className="trip-balance trip-details">$120.00</div>
    </div>
  );
};

export default TripSummary;
