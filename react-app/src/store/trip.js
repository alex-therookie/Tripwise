// Notes on store blueprint
const LOAD_TRIP = "trip/LOAD_TRIP";
const ADD_TRIP = "trip/ADD_TRIP";
const ADD_ACTIVITY = "trip/ADD_ACTIVITY";

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

export const addActivity = (activity) => {
  return {
    type: ADD_ACTIVITY,
    activity,
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

export const postTrip = (name, photoUrl, members) => async (dispatch) => {
  const users = [];
  for (const member of members) {
    users.push(member.value);
  }
  const res = await fetch(`/api/trips/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, photoUrl, users }),
  });
  const tripData = await res.json();
  dispatch(addTrip(tripData));
  return tripData;
};

export const postActivity =
  ({ name, photoUrl, tripId, description, date }) =>
  async (dispatch) => {
    const res = await fetch(`/api/activities/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, photoUrl, tripId, description, date }),
    });
    const activityData = await res.json();
    dispatch(addActivity(activityData));
    return activityData;
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

    case ADD_TRIP: {
      return {
        ...state,
        [action.trip.id]: action.trip,
      };
    }

    case ADD_ACTIVITY: {
      const trip = state[action.activity.tripId];

      return {
        ...state,
        [trip.id]: {
          ...trip,
          activities: [...trip.activities, action.activity],
        },
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
