import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { postTrip } from "../../store/trip";
import { getUserTrips } from "../../store/session";
import "./CreateTrip.css";

const CreateTrip = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [members, setMembers] = useState([]);
  const [friends, setFriends] = useState([]);
  const currUser = useSelector((state) => state.session.user);
  const usersOfInterest = useSelector((state) => {
    const allUsers = [
      ...state.session.user.following,
      ...state.session.user.followers,
    ];
    let userSet = new Set();
    const uniqueUsers = [];
    allUsers.forEach((user) => {
      if (!userSet.has(user.value)) {
        uniqueUsers.push(user);
        userSet.add(user.value);
      }
    });
    return uniqueUsers;
  });

  useEffect(() => {
    setFriends(usersOfInterest);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trip = await dispatch(postTrip(name, photoUrl, members));
    dispatch(getUserTrips(currUser.id));
    if (trip) history.push(`/trips/${trip.id}`);
  };

  const onChangeInput = (value) => {
    setMembers([...value, { label: currUser.username, value: currUser.id }]);
  };

  return (
    <div className="trip-form-container" onSubmit={handleSubmit}>
      <div>
        <h2>Start a new trip!</h2>
      </div>
      <form className="trip-form">
        <div>
          <h4>What's the name of the trip?</h4>
          <input
            className="name-input"
            type="text"
            name="name"
            value={name}
            placeholder="New Year's in Spain"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* <div>
          <h4>Add a picture!</h4>
          <input
            className="photoUrl-input"
            type="text"
            name="photoUrl"
            value={photoUrl}
            placeholder="Photo URL"
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </div> */}
        <div>
          <h4>Add members!</h4>
          <Select
            defaultValue={[friends[0]]}
            isMulti
            name="colors"
            options={friends}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={onChangeInput}
          />
        </div>
        <div>
          <button className="create-trip-btn btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTrip;
