import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { ModalContext } from "../../context/Modal";
import "./ExpenseModal.css";

const ExpenseModal = ({ onClose, children }) => {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="expense-modal">
      <div id="expense-modal-background" onClick={onClose} />
      <div id="expense-modal-content">{children}</div>
    </div>,
    modalNode
  );
};

export default ExpenseModal;
