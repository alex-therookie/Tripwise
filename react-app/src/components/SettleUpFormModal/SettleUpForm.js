import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import "./SettleUpForm.css";

const SettleUpForm = ({ expense, setShowModal }) => {
  const dispatch = useDispatch();
  const [payment, setPayment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const SettleUpForm = {
      payment,
    };

    // const transfer = await dispatch(postPayment(payment));
    // if (transfer) setShowModal(false);
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
