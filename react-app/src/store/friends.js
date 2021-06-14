const GET_FOLLOWING = "friends/GET_FOLLOWING";

export const getFollowing = (following) => {
  return {
    action: GET_FOLLOWING,
    following,
  };
};

export const getFriends = () => async (dispatch) => {
  const res = await fetch(`/api/follows/`);
  const friends = await res.json();

  if (res.ok) {
    dispatch(getFollowing(friends));
    return friends;
  }
};

const friends = (state = {}, action) => {
  switch (action.type) {
    case GET_FOLLOWING: {
      return {
        ...state,
        following: action.following,
      };
    }
    default:
      return state;
  }
};

export default friends;
