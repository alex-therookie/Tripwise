import React, { useState } from "react";
import ActivityModal from "./ActivityModal";
import ActivityForm from "./ActivityForm";

function ActivityFormModal({ tripId }) {
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
          <ActivityForm tripId={tripId} />
        </ActivityModal>
      )}
    </>
  );
}

export default ActivityFormModal;
