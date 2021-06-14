import React, { useState, UseEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowing } from "../../store/friends";

const Friends = () => {
  const dispatch = useDispatch();
  // const following = useSelector((state) => state.friends.following);
  return (
    <div className="friends-container">
      <div className="friend-list">
        {/* {following &&
          following.map((friend) => {
            <div className="friend">{friend.username}</div>;
          })} */}
      </div>
    </div>
  );
};

export default Friends;
