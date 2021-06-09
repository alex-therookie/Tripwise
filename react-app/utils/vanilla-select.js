// Multi select option from scratch

const [friends, setFriends] = useState([
  { id: 1, name: "Demo" },
  { id: 2, name: "tester" },
]);

const handleChange = (e) => {
  const selected = [];
  let selectFriends = e.target.selectedOptions;

  for (const selectFriend of selectFriends) {
    selected.push(selectFriend.value);
  }
  if (!users.includes(...selected)) {
    setUsers([...users, ...selected]);
  }
};

<select multiple={true} onChange={(e) => handleChange(e)}>
  {friends.map((friend) => {
    return <option value={friend.id}>{friend.name}</option>;
  })}
</select>;
