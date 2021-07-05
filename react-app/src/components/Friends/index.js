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
        <button onClick={handleAddUser}>Add</button>
      </div>
      <div className="friend-list">
        {following &&
          following.map((name) => {
            return (
              <div key={name} className="friend">
                {name}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Friends;
