// Notes on store blueprint
const LOAD_TRIP = "trip/LOAD_TRIP";
const ADD_TRIP = "trip/ADD_TRIP";

export const loadTrip = (trip) => {
  return {
    type: LOAD_TRIP,
    trip,
  };
};

export const addTrip = (trip) => {
  return {
    type: ADD_TRIP,
    trip,
  };
};

export const getTrip = (tripId) => async (dispatch) => {
  const res = await fetch(`/api/${tripId}/`);
  if (res.ok) {
    const trip = await res.json();
    console.log(trip);
    dispatch(loadTrip(trip));
  }
};

export const postTrip = (trip) => async (dispatch) => {
  const res = await fetch(`/api/trips/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: {
      trip: JSON.stringify(trip),
    },
  });
  const trip = await res.json();
  console.log(trip);
  dispatch(addTrip(trip));
};

const initialState = {};

const tripReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TRIP: {
      const { trip } = action;

      return {
        ...state,
        [trip.id]: trip,
      };
    }

    case ADD_TRIP: {
      return {
        ...state,
        [trip.id]: trip,
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
