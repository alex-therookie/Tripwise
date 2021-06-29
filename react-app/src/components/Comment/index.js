import React, { useEffect, useState } from "react";
import "./Comment.css";

const Comment = () => {
  return (
    <div className="comments-container">
      <h4>Comments</h4>
      <div className="comment">
        <div className="comment-user"></div>
      </div>
      <div className="add-comment"></div>
    </div>
  );
};

export default Comment;
