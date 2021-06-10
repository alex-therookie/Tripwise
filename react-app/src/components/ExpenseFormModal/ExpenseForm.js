import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
// import { postExpense } from "../../store/trip";
import Select from "react-select";
import "./ExpenseForm.css";

const ExpenseForm = ({ tripId, setShowModal, activity }) => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [amount, setAmount] = useState("");
  const [expenseUsers, setExpenseUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const [loadedMembers, setLoadedMembers] = useState(false);
  const user = useSelector((state) => state.session.user);
  // const users = useSelector((state) => state.trip[tripId].users);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const expenseForm = {
      amount,
      photoUrl,
      description,
      tripId,
      activityId: activity.id,
    };
    // const expense = await dispatch(postExpense(expenseForm));
    // if (expense) setShowModal(false);
  };

  // TODO: Make selector get only trip members not all users

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setMembers(
        responseData.users.filter((member) => user.id !== member.value)
      );
      setLoadedMembers(true);
    }
    fetchData();
  }, []);

  const onChangeInput = (value) => {
    setExpenseUsers(value);
  };

  console.log("MEMBERSSSS ====> ", [...members]);

  return (
    <div className="expense-form-container" onSubmit={handleSubmit}>
      <div className="expense-form-header">
        <h2>Add an expense</h2>
      </div>
      <form className="expense-form">
        <div>
          <input
            className="name-input"
            type="text"
            name="name"
            value={description}
            placeholder="Enter a description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="amount-container">
          <span className="currency-code">$</span>
          <input
            name="amount"
            type="text"
            placeholder="0.00"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </div>
        <input
          className="photoUrl-input"
          type="text"
          name="photoUrl"
          value={photoUrl}
          placeholder="Photo URL"
          onChange={(e) => setPhotoUrl(e.target.value)}
        />
        {loadedMembers && (
          <Select
            defaultValue={members}
            isMulti
            name="colors"
            options={members}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={onChangeInput}
          />
        )}
      </form>
      <button className="create-expense-btn btn" type="submit">
        Submit
      </button>
    </div>
  );
};

export default ExpenseForm;
