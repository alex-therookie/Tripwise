import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ExpenseDetail from "../ExpenseDetail";
import "./ExpenseSummary.css";

const ExpenseSummary = ({ expense }) => {
  const [showExpense, setShowExpense] = useState(false);
  const currUser = useSelector((state) => state.session.user);
  const expUser = expense.expense_users.find(
    (user) => user.userId === currUser.id
  );
  console.log("SHOW EXPENSE ====> ", showExpense);

  const handleClick = () => {
    setShowExpense(true);
  };
  console.log(expense.id);

  return (
    <>
      <div className="exp-summary-container" onClick={handleClick}>
        <div className="exp-summary desc">{expense.description}</div>
        <div className="exp-summary amount">{`$${expense.amount}`}</div>
        <div className="exp-summary balance">{`$${expUser.balance}`}</div>
      </div>
      {showExpense && (
        <ExpenseDetail
          expense={expense}
          setShowExpense={setShowExpense}
          showExpense={showExpense}
        />
      )}
    </>
  );
};

export default ExpenseSummary;
