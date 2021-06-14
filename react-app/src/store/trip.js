// Notes on store blueprint
const LOAD_TRIP = "trip/LOAD_TRIP";
const LOAD_EXPENSES = "trip/LOAD_EXPENSES";
const ADD_TRIP = "trip/ADD_TRIP";
const REMOVE_TRIP = "trip/REMOVE_TRIP";
const ADD_ACTIVITY = "trip/ADD_ACTIVITY";
const ADD_PAYMENT = "trip/ADD_PAYMENT";
const ADD_EXPENSE = "trip/ADD_EXPENSE";
const SET_EXPENSE = "trip/SET_EXPENSE";

export const loadTrip = (trip) => {
  return {
    type: LOAD_TRIP,
    trip,
  };
};

export const loadExpenses = (expenses) => {
  return {
    type: LOAD_EXPENSES,
    expenses,
  };
};

export const addTrip = (trip) => {
  return {
    type: ADD_TRIP,
    trip,
  };
};

export const removeTrip = (trip) => {
  return {
    type: ADD_TRIP,
    trip,
  };
};

export const addPayment = (userExp) => {
  return {
    type: ADD_PAYMENT,
    userExp,
  };
};

export const addActivity = (activity) => {
  return {
    type: ADD_ACTIVITY,
    activity,
  };
};

export const addExpense = (expense) => {
  return {
    type: ADD_EXPENSE,
    expense,
  };
};

export const setExpenseDetail = (expense) => {
  return {
    type: SET_EXPENSE,
    expense,
  };
};

export const getTrip = (tripId) => async (dispatch) => {
  const res = await fetch(`/api/trips/${tripId}`);
  if (res.ok) {
    const trip = await res.json();
    console.log(trip);
    dispatch(loadTrip(trip));
  }
};

export const deleteTrip = (tripId) => async (dispatch) => {
  const res = await fetch(`/api/trips/${tripId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    const trip = await res.json();
    console.log(trip);
    dispatch(removeTrip(trip));
    return trip;
  }
};

export const getExpenses = (tripId) => async (dispatch) => {
  const res = await fetch(`/api/expenses/${tripId}`);
  if (res.ok) {
    const expensesData = await res.json();
    console.log("EXPENSES DATA ====> ", expensesData);
    dispatch(loadExpenses(expensesData.expenses));
  }
};

export const postTrip = (name, photoUrl, members) => async (dispatch) => {
  const users = members.map((user) => user.value);
  const res = await fetch(`/api/trips/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, photoUrl, users }),
  });
  const tripData = await res.json();
  dispatch(addTrip(tripData));
  return tripData;
};

export const putPayment =
  ({ payment, expenseId }) =>
  async (dispatch) => {
    console.log("STORE PAYMENT ====> ", expenseId);
    const res = await fetch(`/api/expenses/${expenseId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payment }),
    });
    const userExpData = await res.json();
    console.log("USER EXP =====> ", userExpData);
    dispatch(addPayment(userExpData));
    return userExpData;
  };

export const postActivity =
  ({ name, photoUrl, tripId, description, date }) =>
  async (dispatch) => {
    // date = new Date(date).toDateString();
    const res = await fetch(`/api/activities/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, photoUrl, tripId, description, date }),
    });
    const activityData = await res.json();
    dispatch(addActivity(activityData));
    return activityData;
  };

export const postExpense =
  ({
    description,
    photoUrl,
    tripId,
    amount,
    activityId,
    expenseUsers,
    userId,
  }) =>
  async (dispatch) => {
    const res = await fetch(`/api/expenses/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount,
        activityId,
        expense_users: expenseUsers,
        photoUrl,
        tripId,
        description,
        userId,
      }),
    });
    const expenseData = await res.json();
    console.log(expenseData);
    dispatch(addExpense(expenseData));
    return expenseData;
  };

const initialState = {};

const tripReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TRIP: {
      return {
        ...state,
        [action.trip.id]: action.trip,
      };
    }
    case REMOVE_TRIP: {
      return {
        ...state,
      };
    }

    case LOAD_EXPENSES: {
      const expensesObj = {};
      action.expenses.forEach((exp) => {
        expensesObj[exp.id] = exp;
      });
      return {
        ...state,
        expenses: expensesObj,
      };
    }

    case ADD_TRIP: {
      return {
        ...state,
        [action.trip.id]: action.trip,
      };
    }

    case ADD_PAYMENT: {
      console.log("INSIDE CASE ====> ", action);
      const expId = action.userExp.expenseId;
      const userId = action.userExp.userId;

      return {
        ...state,
        expenses: {
          ...state.expenses,
          [expId]: {
            ...state.expenses[expId],
            expense_users: {
              ...state.expenses[expId].expense_users,
              [userId]: action.userExp,
            },
          },
        },
      };
    }

    case ADD_ACTIVITY: {
      const trip = state[action.activity.tripId];

      return {
        ...state,
        [trip.id]: {
          ...trip,
          activities: {
            ...trip.activities,
            [action.activity.id]: action.activity,
          },
        },
      };
    }

    case ADD_EXPENSE: {
      const trip = state[action.expense.tripId];
      const activity = trip.activities[action.expense.activityId];
      activity.expenses.push(action.expense);

      return {
        ...state,
        [trip.id]: {
          ...trip,
          activities: { ...trip.activities, [activity.id]: activity },
        },
      };
    }

    case SET_EXPENSE: {
      return {
        ...state,
        expenseDetail: action.expense,
      };
    }

    default:
      return state;
  }
};

export default tripReducer;

// store = {
//     user: {}, //
//     expenses: {
//         activityID: [expense, {comments: []}]
//     }, //Expenses must belong to an activity

//     activities: { 1: [], 2:[], 3: [], .......tripId: activities[]},

//     trips: { 1: {trip}, 2: {trip}},

//     comments: { expenseID: [comment, comment], 2: [], 3: []},

// }

// expenses: {
//     trips: {
//         tripId: [{comments: []}, expense]
//     },
//     activities: {

//         activityId: [{comments: []}}, expense],
//     }
// }, // Expenses can belong to an activity or trip with "Quick expense"
