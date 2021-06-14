import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SettleUpFormModal from "../SettleUpFormModal";
import "./ExpenseDetail.css";

const ExpenseDetail = ({ setShowExpense, showExpense }) => {
  const { tripId } = useParams();
  const members = useSelector((state) => state.trip[tripId].users);
  const expense = useSelector((state) => state.trip.expenseDetail);
  const user = useSelector((state) => state.session.user);
  const handleClose = (e) => {
    setShowExpense(false);
  };

  const handleSettle = async (e) => {
    // const balance = await fetch(`/api/`)
  };

  if (!expense) return null;

  console.log(expense);

  return (
    <div className={showExpense ? "expense-detail active" : "expense-detail"}>
      <div className="exp-detail-header">Expense</div>
      <div className="exp-detail-container">
        <div className="exp-detail-topbar">
          <div className="exp-receipt">photo</div>
          <div className="exp-desc-amount">
            <div className="exp-desc">{expense.description}</div>
            <div className="exp-amount">{`$${expense.amount}`}</div>
          </div>
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
                } owes ${members[expense.userId]} $${Math.abs(
                  expUser.balance
                )}`}</div>
              );
            }
          })}
        </div>
      </div>
      {user.id !== expense.userId && <SettleUpFormModal expense={expense} />}
      <button
        className="close-exp btn btn-small btn-green"
        onClick={handleClose}
      >
        Close
      </button>
    </div>
  );
};

export default ExpenseDetail;
