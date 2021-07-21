import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { ModalContext } from "../../context/Modal";
import "./ActivityModal.css";

const ActivityModal = ({ onClose, children }) => {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="activity-modal">
      <div id="activity-modal-background" onClick={onClose} />
      <div id="activity-modal-content">{children}</div>
    </div>,
    modalNode
  );
};

export default ActivityModal;
