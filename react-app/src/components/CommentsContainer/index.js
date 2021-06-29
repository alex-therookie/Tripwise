import React, { useState, useEffect } from "react";
import Comment from "../Comment";
import "./CommentsContainer.css";

const CommentsContainer = ({ comments }) => {
  return (
    <div className="comments-container">
      <h4>Comments</h4>
      {comments.map((comment) => (
        <Comment comment={comment} />
      ))}
      <div className="add-comment">
        <textarea placeholder="Add a comment"></textarea>
        <button className="btn btn-small btn-orange">Post</button>
      </div>
    </div>
  );
};

export default CommentsContainer;
