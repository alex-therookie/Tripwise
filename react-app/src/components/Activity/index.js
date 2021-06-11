import React, { useEffect, useState } from "react";
import ExpenseFormModal from "../ExpenseFormModal";
import ExpenseSummary from "../ExpenseSummary";
import ExpenseDetail from "../ExpenseDetail";
import "./Activity.css";

const Activity = ({ activity }) => {
  const [openActivity, setOpenActivity] = useState(false);
  const [showExpense, setShowExpense] = useState(false);
  const activityClick = () => {
    setOpenActivity(!openActivity);
  };

  const expenseClick = () => {
    setShowExpense(true);
  };

  // TODO: Refactor activities classnames

  return (
    <div className="activity-container">
      <div className="activity-summary" onClick={activityClick}>
        <div className="activity-date activity-details">July 4</div>
        <div className="activity-img activity-details">photo</div>
        <div className="activity-name activity-details">
          <h3>{activity.name}</h3>
        </div>
        <div className="activity-balance activity-details">$120.00</div>
      </div>
      <div
        className={
          openActivity
            ? "activity-detail-dropdown"
            : "activity-detail-dropdown hidden"
        }
      >
        <div className="activity-dropdown-detail">
          <div className="activity-facts">
            <div className="activity-detail-img">photo</div>
            <h4>{activity.name}</h4>
            <h5>{activity.date}</h5>
            <p>{activity.description}</p>
          </div>
          <ExpenseFormModal activity={activity} />
        </div>
        <div className="activity-expenses-container scroll scroll1">
          <div className="act-exp-header">Current expenses</div>
          {activity.expenses.map((expense) => (
            <ExpenseSummary expense={expense} expenseClick={expenseClick} />
          ))}
          <ExpenseDetail
            setShowExpense={setShowExpense}
            showExpense={showExpense}
          />
        </div>
      </div>
    </div>
  );
};

export default Activity;
