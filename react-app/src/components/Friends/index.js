import React, { useState, UseEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFollow } from "../../store/session";
import "./Friends.css";

const Friends = () => {
  const dispatch = useDispatch();
  const [addedUser, setAddedUser] = useState("");
  const following = useSelector((state) => state.session.user.following);

  const handleAddUser = () => {
    dispatch(addFollow(addedUser));
    setAddedUser("");
  };
  return (
    <div className="friends-container">
      <div className="friends-topbar">
        <h2>Friends</h2>
      </div>
      <div className="friends-subbar">
        Add friend:{" "}
        <input
          placeholder=" Email"
          onChange={(e) => setAddedUser(e.target.value)}
          value={addedUser}
        ></input>
        <button className="btn-small" onClick={handleAddUser}>
          Add
        </button>
      </div>
      <div className="friend-list">
        {following &&
          following.map((user) => {
            return (
              <div key={user.value} className="friend">
                <i className="fas fa-user-alt user-icon"></i>
                {user.label}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Friends;
