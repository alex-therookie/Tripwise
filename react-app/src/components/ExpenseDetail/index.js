import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "./ExpenseDetail.css";

const ExpenseDetail = ({ setShowExpense, showExpense }) => {
  const expense = useSelector((state) => state.trip.expenseDetail);
  const handleClick = (e) => {
    setShowExpense(false);
  };

  if (!expense) return null;

  return (
    <div className={showExpense ? "expense-detail active" : "expense-detail"}>
      <div className="exp-detail-header">Expense</div>
      <div className="exp-detail-container">
        <div>{expense.description}</div>
        <div>{`$${expense.amount}`}</div>
      </div>
      <div className="close-exp" onClick={handleClick}>
        CLOSE {expense.id}
      </div>
    </div>
  );
};

export default ExpenseDetail;
