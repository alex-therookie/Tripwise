import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Comment.css";

const Comment = ({ comment, members }) => {
  console.log(members[comment.userId]);
  return (
    <>
      <div className="comment">
        <div className="comment-user">{members[comment.userId]} says: </div>
        {comment.text}
      </div>
    </>
  );
};

export default Comment;
