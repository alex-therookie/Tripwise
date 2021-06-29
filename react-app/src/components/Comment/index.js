import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Comment.css";

const Comment = ({ comment }) => {
  const user = useSelector((state) => state.session.user);
  console.log(user.username);
  return (
    <>
      <div className="comment">
        <div className="comment-user">{user.username} says: </div>
        {comment.text}
      </div>
    </>
  );
};

export default Comment;
