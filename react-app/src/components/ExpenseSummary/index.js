import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ExpenseDetail from "../ExpenseDetail";
import { setExpenseDetail } from "../../store/trip";
import "./ExpenseSummary.css";

const ExpenseSummary = ({ expense, expenseClick }) => {
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.session.user);
  const expUser = expense.expense_users.find(
    (user) => user.userId === currUser.id
  );

  const handleClick = () => {
    dispatch(setExpenseDetail(expense));
    expenseClick();
  };
  console.log(expense.id);

  return (
    <>
      <div className="exp-summary-container" onClick={handleClick}>
        <div className="exp-summary desc">{expense.description}</div>
        <div className="exp-summary amount">{`$${expense.amount}`}</div>
        <div className="exp-summary balance">{`$${expUser.balance}`}</div>
      </div>
    </>
  );
};

export default ExpenseSummary;
