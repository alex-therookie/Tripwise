import React, { useState } from "react";
import SettleUpModal from "./SettleUpModal";
import SettleUpForm from "./SettleUpForm";

function SettleUpFormModal({ expense }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="btn btn-small btn-orange settle-exp"
        onClick={() => setShowModal(true)}
      >
        Settle up
      </button>
      {showModal && (
        <SettleUpModal onClose={() => setShowModal(false)}>
          <SettleUpForm setShowModal={setShowModal} expense={expense} />
        </SettleUpModal>
      )}
    </>
  );
}

export default SettleUpFormModal;
