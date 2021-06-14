import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { putPayment } from "../../store/trip";
import "./SettleUpForm.css";

const SettleUpForm = ({ expense, setShowModal }) => {
  const dispatch = useDispatch();
  const [payment, setPayment] = useState("");
  const exp_users = useSelector(
    (state) => state.trip.expenses[expense.id].expense_users
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const settleUpForm = {
      payment,
      expenseId: expense.id,
    };
    console.log("SEttleUpForm =====> ", settleUpForm);

    const transfer = await dispatch(putPayment(settleUpForm));
    if (transfer) {
      setShowModal(false);
      window.location.reload();
    }
  };

  return (
    <div className="SettleUp-form-container" onSubmit={handleSubmit}>
      <div className="SettleUp-form-header">
        <h2>Make a payment</h2>
      </div>
      <form className="SettleUp-form">
        <div className="payment-container">
          <h4>Amount to pay</h4>
          <input
            className="payment-input"
            type="text"
            name="payment"
            value={payment}
            placeholder="0.00"
            onChange={(e) => setPayment(e.target.value)}
          />
        </div>
        <button className="create-SettleUp-btn btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SettleUpForm;
