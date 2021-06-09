import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { postActivity } from "../../store/trip";
import "./ActivityForm.css";

const ActivityForm = ({ tripId, setShowModal }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const activityForm = {
      name,
      photoUrl,
      description,
      date,
      tripId,
    };
    const activity = await dispatch(postActivity(activityForm));
    if (activity) setShowModal(false);
  };

  return (
    <div className="activity-form-container" onSubmit={handleSubmit}>
      <div className="activity-form-header">
        <h2>Add Activity</h2>
      </div>
      <form className="activity-form">
        <div>
          <h4>What's the name of the activity?</h4>
          <input
            className="name-input"
            type="text"
            name="name"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <h4>Add a picture (optional)</h4>
          <input
            className="photoUrl-input"
            type="text"
            name="photoUrl"
            value={photoUrl}
            placeholder="Photo URL"
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </div>
        <div>
          <h4>Add a description...</h4>
          <textarea
            name="description"
            type="text"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </div>
        <div>
          <h4>Date of activity?</h4>
          <input
            name="date"
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          ></input>
        </div>
        <button className="create-activity-btn btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ActivityForm;
