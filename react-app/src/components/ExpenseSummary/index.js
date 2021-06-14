import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ExpenseDetail from "../ExpenseDetail";
import { setExpenseDetail } from "../../store/trip";
import "./ExpenseSummary.css";

const ExpenseSummary = ({ expense, expenseClick }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const expUser = expense.expense_users[user.id];

  const handleClick = () => {
    dispatch(setExpenseDetail(expense));
    expenseClick();
  };
  console.log(expense.id);

  return (
    <>
      <div className="exp-summary-container" onClick={handleClick}>
        <div className="exp-summary desc">{expense.description}</div>
        <div className="exp-summary amount">{`Cost: $${expense.amount}`}</div>
      </div>
    </>
  );
};

export default ExpenseSummary;
