import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getTrip, getExpenses } from "../../store/trip";
import { deleteTrip } from "../../store/trip";
import Activity from "../Activity";
import ActivityFormModal from "../ActivityFormModal";
import "./TripDetail.css";

const TripDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { tripId } = useParams();
  const trip = useSelector((state) => state.trip[tripId]);
  const activities = useSelector((state) => state.trip[tripId]?.activities);
  const user = useSelector((state) => state.session.user);
  const [userBalance, setUserBalance] = useState(0);
  const expenses = useSelector((state) => state.trip.expenses);
  console.log("EXPENSES ", expenses);
  console.log("user balance", userBalance);

  useEffect(() => {
    dispatch(getTrip(tripId));
    dispatch(getExpenses(tripId));
  }, [dispatch]);

  const handleDelete = async () => {
    dispatch(deleteTrip(tripId));
    history.push("/");
  };

  useEffect(() => {
    let owes = 0;
    let owed = 0;

    for (const key in expenses) {
      if (expenses[key].userId === user.id) {
        for (const expUser in expenses[key].expense_users) {
          if (expUser !== user.id.toString()) {
            owed += Math.abs(
              parseFloat(expenses[key].expense_users[expUser].balance)
            );
          }
        }
      } else if (expenses[key].expense_users[user.id]) {
        let owesTemp = parseFloat(
          expenses[key].expense_users[user.id]?.balance
        );
        owes += isNaN(owesTemp) ? 0.0 : owesTemp;
      }
    }

    let total = owed + owes;
    setUserBalance(total);
  }, [userBalance, expenses]);

  if (!trip) return null;

  return (
    <div className="trip-page-container">
      <div className="trip-detail-container">
        <div className="trip-topbar">
          <div className="img-name-wrapper">
            {/* <div className="trip-img">photo</div> */}
            <h2 className="trip-name">{trip.name}</h2>
          </div>
          <div className="trip-btn-wrapper">
            <ActivityFormModal tripId={trip.id} />
            {trip.userId == user.id && (
              <button
                onClick={handleDelete}
                className="btn btn-large btn-orange"
              >
                Delete
              </button>
            )}
            {/* <button className="btn btn-large btn-orange">Settle up</button> */}
          </div>
        </div>
        {userBalance < 0 ? (
          <div className="trip-subbar">{`Trip balance: -$${Math.abs(
            userBalance
          ).toFixed(2)}`}</div>
        ) : (
          <div className="trip-subbar">{`Trip balance: +$${userBalance}`}</div>
        )}
        <div className="trip-subbar">
          Trip members:
          <div className="trip-members">
            {Object.entries(trip.users).map(([id, username], index, array) => {
              if (index === array.length - 1)
                return (
                  <span key={id} className="trip-member">
                    {`${username}`}
                  </span>
                );
              return (
                <span key={id} className="trip-member">
                  {`${username},`}
                </span>
              );
            })}
          </div>
        </div>
        <div className="activities-wrapper">
          {Object.entries(activities).map(([id, activity]) => (
            <Activity key={id} activity={activity} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripDetail;
