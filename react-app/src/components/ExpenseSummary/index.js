import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./ExpenseSummary.css";

const ExpenseSummary = ({ expense }) => {
  const currUser = useSelector((state) => state.session.user);
  const expUser = expense.expense_users.find(
    (user) => user.userId === currUser.id
  );
  return (
    <div className="exp-summary-container">
      <div className="exp-summary desc">{expense.description}</div>
      <div className="exp-summary amount">{expense.amount}</div>
      <div className="exp-summary balance">{`$${expUser.balance}`}</div>
    </div>
  );
};

export default ExpenseSummary;
