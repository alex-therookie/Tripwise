import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./ExpenseDetail.css";

const ExpenseDetail = ({ expense, setShowExpense, showExpense }) => {
  const handleClick = () => {
    setShowExpense(false);
    console.log("IN DETAIL", showExpense);
  };
  return (
    <div className={showExpense ? "expense-detail active" : "expense-detail"}>
      <div className="close-exp" onClick={handleClick}>
        CLOSE {expense.id}
      </div>
    </div>
  );
};

export default ExpenseDetail;
