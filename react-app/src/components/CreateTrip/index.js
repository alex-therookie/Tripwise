import React, { useState, useEffect } from "react";
import "./CreateTrip.css";

const CreateTrip = () => {
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([
    { id: 1, name: "Demo" },
    { id: 2, name: "tester" },
  ]);
  console.log("USERS", users);

  const handleChange = (e) => {
    const selected = [];
    let selectFriends = e.target.selectedOptions;
    console.log(selectFriends);

    for (const selectFriend of selectFriends) {
      selected.push(selectFriend.value);
    }
    if (!users.includes(...selected)) {
      setUsers([...users, ...selected]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(users);
  };

  return (
    <div className="form-container" onSubmit={handleSubmit}>
      <h2>Start a new trip!</h2>
      <form className="trip-form">
        <div>What's the name of the trip?</div>
        <input
          className="name-input"
          type="text"
          name="name"
          value={name}
          placeholder="New Year's in Spain"
          onChange={(e) => setName(e.target.value)}
        />
        <div>Add a picture!</div>
        <input
          className="photoUrl-input"
          type="text"
          name="photoUrl"
          value={photoUrl}
          placeholder="Photo URL"
          onChange={(e) => setPhotoUrl(e.target.value)}
        />
        <div>Add members</div>
        <select multiple={true} onChange={(e) => handleChange(e)}>
          {friends.map((friend) => {
            return <option value={friend.id}>{friend.name}</option>;
          })}
        </select>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CreateTrip;
