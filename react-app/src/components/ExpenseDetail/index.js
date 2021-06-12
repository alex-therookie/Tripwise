import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./ExpenseDetail.css";

const ExpenseDetail = ({ setShowExpense, showExpense }) => {
  const { tripId } = useParams();
  const members = useSelector((state) => state.trip[tripId].users);
  const expense = useSelector((state) => state.trip.expenseDetail);
  const handleClick = (e) => {
    setShowExpense(false);
  };

  if (!expense) return null;

  console.log(expense);

  return (
    <div className={showExpense ? "expense-detail active" : "expense-detail"}>
      <div className="exp-detail-header">Expense</div>
      <div className="exp-detail-container">
        <div className="exp-detail-topbar">
          <div>{expense.description}</div>
          <div>{`$${expense.amount}`}</div>
          <div className="activity-img activity-details">photo</div>
        </div>
        <div className="exp-detail-users">
          {expense.expense_users.map((expUser) => {
            if (expUser.userId === expense.userId) {
              return (
                <div className="exp-detail-user">{`${
                  members[expUser.userId]
                } paid $${expense.amount}`}</div>
              );
            } else {
              return (
                <div className="exp-detail-user">{`${
                  members[expUser.userId]
                } owes ${members[expense.userId]} $${expUser.balance}`}</div>
              );
            }
          })}
        </div>
      </div>
      <button
        className="close-exp btn btn-small btn-green"
        onClick={handleClick}
      >
        Close
      </button>
    </div>
  );
};

export default ExpenseDetail;
