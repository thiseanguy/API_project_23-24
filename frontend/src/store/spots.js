// store/spots.js

// Action Types
const SET_SPOTS = 'spots/setSpots';

// Action Creators
const setSpots = (spots) => ({
  type: SET_SPOTS,
  payload: spots,
});

// Thunks
export const fetchSpots = () => async (dispatch) => {
  const response = await fetch('/api/spots', {
    method: 'GET',
  });
  const data = await response.json();
  dispatch(setSpots(data.Spots));
};

// Initial State
const initialState = {
  spots: [],
  currentSpot: null,
};

// Reducer
const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPOTS:
      return { ...state, spots: action.payload };
    default:
      return state;
  }
};

export default spotsReducer;
