import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUserExpenses, getUserTrips } from "../../store/session";
import Footer from "../Footer";
import Trips from "../Trips/index";
import "./Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const expenses = useSelector((state) => state.session.user.expenses);
  const [userBalance, setUserBalance] = useState(0);
  const [userOwes, setUserOwes] = useState(0);
  const [userIsOwed, setUserIsOwed] = useState(0);

  useEffect(() => {
    dispatch(getUserExpenses());
    dispatch(getUserTrips(user.id));
  }, [dispatch]);

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
    setUserOwes(owes);
    setUserIsOwed(owed);
  }, [userBalance, expenses]);

  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-items">
          <h2>Dashboard</h2>
          <div className="dashboard-btn-wrapper">
            <NavLink to={"/new-trip"}>
              <button className="btn btn-large btn-green">Plan a trip</button>
            </NavLink>
            {/* <button className="btn btn-large btn-orange">Settle up</button> */}
          </div>
        </div>
        <div className="dashboard-balances">
          <div>
            <span>total balance</span>
            <br />
            <span
              className={
                userBalance < 0 ? "total-balance negative" : "total-balance"
              }
            >
              {userBalance < 0
                ? `-$${Math.abs(userBalance.toFixed(2))}`
                : `$${userBalance.toFixed(2)}`}
            </span>
          </div>
          <div className="balance-one">
            <span>you owe</span>
            <br />
            <span className={userOwes < 0 ? "you-owe negative" : "you-owe"}>
              {userOwes < 0
                ? `-$${Math.abs(userOwes.toFixed(2))}`
                : `$${userOwes.toFixed(2)}`}
            </span>
          </div>
          <div>
            <span>you are owed</span>
            <br />
            <span
              className={
                userIsOwed < 0 ? "you-are-owed negative" : "you-are-owed"
              }
            >
              {userIsOwed < 0
                ? `-$${Math.abs(userIsOwed.toFixed(2))}`
                : `$${userIsOwed.toFixed(2)}`}
            </span>
          </div>
        </div>
        <Trips />
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
