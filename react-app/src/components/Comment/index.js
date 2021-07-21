import React from "react";
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
        <div className="comment-user-del">
          <div className="comment-user">{members[comment.userId]} says: </div>
          {comment.userId === user.id ? (
            <div className="comment-del" onClick={handleDelete}>
              <i className="fas fa-times del-icon"></i>
            </div>
          ) : null}
        </div>
        {comment.text}
      </div>
    </>
  );
};

export default Comment;
