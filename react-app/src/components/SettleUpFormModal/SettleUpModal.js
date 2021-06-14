import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { ModalContext } from "../../context/Modal";
import "./SettleUpModal.css";

const SettleUpModal = ({ onClose, children }) => {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="settleUp-modal">
      <div id="settleUp-modal-background" onClick={onClose} />
      <div id="settleUp-modal-content">{children}</div>
    </div>,
    modalNode
  );
};

export default SettleUpModal;
