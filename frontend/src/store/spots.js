import { csrfFetch } from './csrf';

//action types
const SET_SPOTS = 'spots/setSpots';

//action creators
const setSpots = (spots) => ({
    type: SET_SPOTS,
    payload: spots,
});

// Thunks
export const fetchSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');
    const spots = await response.json();
    dispatch(setSpots(spots));
  };

  // Initial State
const initialState = {
    spots: [],
    currentSpot: null,
  };


const spotsReducer = (state = initialState, action) => {
switch (action.type) {
    case SET_SPOTS:
        return { ...state, spots: action.payload };
        default:
            return state;
        }
};
