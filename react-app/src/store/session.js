const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const FOLLOW_USER = "session/FOLLOW_USER";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const followUser = (user) => ({
  type: FOLLOW_USER,
  user,
});

export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data.errors) {
    return;
  }

  dispatch(setUser(data));
};

export const login = (email, password) => async (dispatch) => {
  console.log({ email, password });
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
  if (data.errors) {
    return data;
  }

  dispatch(setUser(data));
  return {};
};

export const addFollow = (email) => async (dispatch) => {
  const response = await fetch("/api/follows/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });
  const userData = await response.json();
  console.log("FOLLOWED_USER DATA ", userData);

  dispatch(followUser(userData));
  return {};
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  dispatch(removeUser());
};

export const signUp = (username, email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  if (data.errors) {
    return data;
  }

  dispatch(setUser(data));
  return {};
};

const initialState = { user: null };

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };

    case FOLLOW_USER:
      return {
        user: {
          ...state.user,
          following: [...state.user.following, action.user.username],
        },
      };
    default:
      return state;
  }
}
