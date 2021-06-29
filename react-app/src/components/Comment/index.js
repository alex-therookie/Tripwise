import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Comment.css";

const Comment = () => {
  const user = useSelector((state) => state.session.user);
  console.log(user.username);
  return (
    <div className="comments-container">
      <h4>Comments</h4>
      <div className="comment">
        <div className="comment-user">{user.username} says: </div>
        Test Comment
      </div>
      <div className="add-comment"></div>
    </div>
  );
};

export default Comment;
