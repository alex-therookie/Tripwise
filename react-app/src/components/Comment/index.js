import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment } from "../../store/trip";
import "./Comment.css";

const Comment = ({ comment, members }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const handleDelete = () => {
    dispatch(deleteComment(comment));
  };
  return (
    <>
      <div className="comment">
        <div className="comment-user">{members[comment.userId]} says: </div>
        {comment.text}
      </div>
      {comment.userId === user.id ? (
        <button className="del-btn" onClick={handleDelete}>
          Delete
        </button>
      ) : null}
    </>
  );
};

export default Comment;
