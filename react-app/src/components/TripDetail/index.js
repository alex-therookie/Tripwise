import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTrip } from "../../store/trip";
import Activity from "../Activity";
import "./TripDetail.css";

const TripDetail = () => {
  const dispatch = useDispatch();
  const { tripId } = useParams();
  const trip = useSelector((state) => state.trip[tripId]);

  useEffect(() => {
    dispatch(getTrip(tripId));
  }, [dispatch]);

  if (!trip) return null;

  return (
    <div className="trip-detail-container">
      <div className="trip-topbar">
        <div className="img-name-wrapper">
          <div className="trip-img">photo</div>
          <h2 className="trip-name">{trip.name}</h2>
        </div>
        <div className="trip-btn-wrapper">
          <button className="btn btn-large btn-green">Add an activity</button>
          <button className="btn btn-large btn-green">Add an expense</button>
          <button className="btn btn-large btn-orange">Settle up</button>
        </div>
      </div>
      <div className="trip-subbar">Your balance for this trip is $20</div>
      <div className="activities-wrapper">
        {trip.activities.map((activity) => (
          <Activity activity={activity} />
        ))}
      </div>
    </div>
  );
};

export default TripDetail;