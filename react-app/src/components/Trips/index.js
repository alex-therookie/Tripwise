import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Trips.css";

const Trips = () => {
  const trips = useSelector((state) => state.session.user.trips);
  console.log(trips);

  const handleClick = () => {};

  if (!trips.length) return null;

  return (
    <div className="trips-container">
      {trips.map((trip) => {
        return (
          <div
            key={trip.id}
            className="trip-summary"
            onClick={() => handleClick(trip.id)}
          >
            <div className="trip-date trip-details">July 4</div>
            <div className="trip-photo trip-details">photo</div>
            <div className="trip-header trip-details">
              <h3>{trip.name}</h3>
            </div>
            <div className="trip-balance trip-details">$120.00</div>
          </div>
        );
      })}
    </div>
  );
};

export default Trips;
