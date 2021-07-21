const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const FOLLOW_USER = "session/FOLLOW_USER";
const LOAD_USER_EXPENSES = "session/LOAD_USER_EXPENSES";
const LOAD_USER_TRIPS = "session/LOAD_USER_TRIPS";

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

export const loadUserExpenses = (expenses) => {
  return {
    type: LOAD_USER_EXPENSES,
    expenses,
  };
};

export const loadUserTrips = (trips) => {
  return {
    type: LOAD_USER_TRIPS,
    trips,
  };
};

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

export const getUserExpenses = () => async (dispatch) => {
  const res = await fetch("/api/expenses/");
  if (res.ok) {
    const expensesData = await res.json();
    dispatch(loadUserExpenses(expensesData.userExpenses));
  }
};

export const getUserTrips = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/trips`);
  if (res.ok) {
    const tripsData = await res.json();
    dispatch(loadUserTrips(tripsData.trips));
  }
};

export const login = (email, password) => async (dispatch) => {
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
          following: [
            ...state.user.following,
            { value: action.user.id, label: action.user.username },
          ],
        },
      };

    // The problem is here!
    case LOAD_USER_EXPENSES: {
      const expensesObj = {};
      action.expenses.forEach((exp) => {
        expensesObj[exp.id] = exp;
      });
      return {
        ...state,
        user: {
          ...state.user,
          expenses: { ...state.user.expenses, ...expensesObj },
        },
      };
    }

    case LOAD_USER_TRIPS: {
      const userTrips = action.trips.map((trip) => {
        return { id: trip.id, name: trip.name };
      });
      return {
        ...state,
        user: {
          ...state.user,
          trips: [...action.trips],
        },
      };
    }
    default:
      return state;
  }
}
