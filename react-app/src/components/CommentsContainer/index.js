import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Comment from "../Comment";
import "./CommentsContainer.css";
import { postComment } from "../../store/trip";

const CommentsContainer = ({ comments, expense, members }) => {
  const dispatch = useDispatch();
  const [userComment, setUserComment] = useState("");

  console.log("COMMENTS ORDER ====> ", comments);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userComment) dispatch(postComment(userComment, expense.id));
    setUserComment("");
  };
  return (
    <>
      <div className="comments-container">
        <h4>Comments</h4>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} members={members} />
        ))}
      </div>
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
    </>
  );
};

export default CommentsContainer;
