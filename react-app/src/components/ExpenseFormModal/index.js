import React, { useState } from "react";
import ExpenseModal from "./ExpenseModal";
import ExpenseForm from "./ExpenseForm";

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
          <ExpenseForm setShowModal={setShowModal} />
        </ExpenseModal>
      )}
    </>
  );
}

export default ExpenseFormModal;
