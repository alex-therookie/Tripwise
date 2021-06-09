import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import "./CreateTrip.css";

const CreateTrip = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loadedFriends, setLoadedFriends] = useState(false);
  console.log(friends);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setFriends(responseData.users);
    }
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(users);
  };

  const onChangeInput = (value) => {
    setUsers(value);
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
        <Select
          defaultValue={[friends[0]]}
          isMulti
          name="colors"
          options={friends}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={onChangeInput}
        />
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CreateTrip;
