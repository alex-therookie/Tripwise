import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TripSummary from "../TripSummary/index";
import { authenticate } from "../../store/session";
import "./Trips.css";

const Trips = () => {
  // const dispatch = useDispatch();
  const trips = useSelector((state) => state.session.user?.trips);

  if (!trips || !trips.length) return null;

  return (
    <div className="trips-container">
      {trips.map((trip) => {
        return <TripSummary key={trip.id} trip={trip} />;
      })}
    </div>
  );
};

export default Trips;
