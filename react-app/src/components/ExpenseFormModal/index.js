import React, { useState } from "react";
import ExpenseModal from "./ExpenseModal";

function ExpenseFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="btn btn-large btn-green"
        onClick={() => setShowModal(true)}
      >
        Add an Expense
      </button>
      {showModal && (
        <ExpenseModal onClose={() => setShowModal(false)}>
          <div>Hello from Expense form</div>
        </ExpenseModal>
      )}
    </>
  );
}

export default ExpenseFormModal;
