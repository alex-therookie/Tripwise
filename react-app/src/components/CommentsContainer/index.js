import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Comment from "../Comment";
import "./CommentsContainer.css";

const CommentsContainer = ({ comments }) => {
  const dispatch = useDispatch();
  const [userComment, setUserComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(postComment());
    console.log(userComment);
  };
  return (
    <div className="comments-container">
      <h4>Comments</h4>
      {comments.map((comment) => (
        <Comment comment={comment} />
      ))}
      <div className="add-comment">
        <form className="comment-form" onSubmit={handleSubmit}>
          <textarea
            placeholder="Add a comment"
            onChange={(e) => setUserComment(e.target.value)}
            value={userComment}
          ></textarea>
          <button type="submit" className="btn btn-small btn-orange">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentsContainer;
