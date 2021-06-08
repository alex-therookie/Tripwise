import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const TripDetail = () => {
  const { tripId } = useParams();
  console.log(tripId);

  return <div>Hello from Trip {tripId} Detail!</div>;
};

export default TripDetail;
