import React, { useState } from "react";
import ActivityModal from "./ActivityModal";

function ActivityFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="btn btn-large btn-green"
        onClick={() => setShowModal(true)}
      >
        Add an activity
      </button>
      {showModal && (
        <ActivityModal onClose={() => setShowModal(false)}>
          <div>Hello from activity form</div>
        </ActivityModal>
      )}
    </>
  );
}

export default ActivityFormModal;
