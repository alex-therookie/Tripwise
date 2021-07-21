import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { postExpense } from "../../store/trip";
import Select from "react-select";
import "./ExpenseForm.css";

const ExpenseForm = ({ setShowModal, activity }) => {
  const dispatch = useDispatch();
  let currUser = useSelector((state) => state.session.user);
  currUser = { value: currUser.id, label: currUser.username };
  const group = useSelector((state) => state.trip[activity.tripId].users);
  const newGroup = Object.entries(group).map(([key, value]) => {
    return { value: Number(key), label: value };
  });
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [amount, setAmount] = useState("");
  const [members, setMembers] = useState([]);
  const [expenseUsers, setExpenseUsers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const split = (amount / expenseUsers.length).toFixed(2);
    const users = {};
    expenseUsers.forEach((user) => {
      if (user.value === currUser.value) {
        users[currUser.value] = split;
      } else {
        users[user.value] = -split;
      }
    });

    const expenseForm = {
      amount,
      photoUrl,
      description,
      tripId: activity.tripId,
      activityId: activity.id,
      expenseUsers: users,
      userId: currUser.value,
    };
    const expense = await dispatch(postExpense(expenseForm));
    if (expense) setShowModal(false);
  };

  useEffect(() => {
    const membersArr = newGroup.filter(
      (member) => currUser.value !== member.value
    );
    setMembers(membersArr);
    setExpenseUsers([...membersArr, currUser]);
  }, []);

  const onChangeInput = (value) => {
    setExpenseUsers([...value, currUser]);
  };

  return (
    <div className="expense-form-container">
      <div className="expense-form-header">
        <h2>Add an expense</h2>
      </div>
      <form id="e-form" className="expense-form" onSubmit={handleSubmit}>
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
        {/* <input
          className="photoUrl-input"
          type="text"
          name="photoUrl"
          value={photoUrl}
          placeholder="Photo URL"
          onChange={(e) => setPhotoUrl(e.target.value)}
        /> */}
        <div>
          Split the bill with friends:
          {members.length && (
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
        </div>
      </form>
      <button form="e-form" className="create-expense-btn btn" type="submit">
        Submit
      </button>
    </div>
  );
};

export default ExpenseForm;
