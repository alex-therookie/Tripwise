import React from "react";
import { useDispatch } from "react-redux";
import { setExpenseDetail } from "../../store/trip";
import "./ExpenseSummary.css";

const ExpenseSummary = ({ expense, expenseClick }) => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.session.user);
  // const expUser = expense.expense_users[user.id];

  const handleClick = () => {
    dispatch(setExpenseDetail(expense));
    expenseClick();
  };

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
