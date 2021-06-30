import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Comment from "../Comment";
import "./CommentsContainer.css";
import { postComment } from "../../store/trip";

const CommentsContainer = ({ comments, expense }) => {
  const dispatch = useDispatch();
  const [userComment, setUserComment] = useState("");
  //   const user = useSelector((state) => state.session.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postComment(userComment, expense.id));
    setUserComment("");
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
