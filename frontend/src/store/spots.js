// // store/spots.js

import { csrfFetch } from './csrf';

const SET_SPOTS = 'spots/setSpots';
const SET_SPOT_DETAILS = 'spots/setSpotDetails';
const SET_SPOT_REVIEWS = 'spots/setSpotReviews';
const ADD_SPOT = 'spots/addSpot';
const ADD_SPOT_IMAGES = 'spots/addSpotImages';
const SET_USER_SPOTS = 'spots/setUserSpots';
const UPDATE_SPOT = 'spots/updateCurrentSpot';
const REMOVE_SPOT = 'spots/removeSpot';

// action creators
const setSpots = (spots) => ({
  type: SET_SPOTS,
  payload: spots,
});

const setSpotDetails = (spot) => ({
  type: SET_SPOT_DETAILS,
  payload: spot,
});

const setSpotReviews = (reviews) => ({
  type: SET_SPOT_REVIEWS,
  payload: reviews,
});

const addSpot = (spot) => ({
  type: ADD_SPOT,
  payload: spot,
});

const addSpotImages = (images) => ({
  type: ADD_SPOT_IMAGES,
  payload: images,
});

const setUserSpots = (spots) => ({
  type: SET_USER_SPOTS,
  payload: spots,
});

const updateSpot = (updatedSpotData) => ({
  type: UPDATE_SPOT,
  payload: updatedSpotData,
});

const removeSpot = (spotId) => ({
  type: REMOVE_SPOT,
  payload: spotId,
});


// Thunks

export const fetchSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots', {
    method: 'GET',
  });
  const data = await response.json();
  dispatch(setSpots(data.Spots));
};

export const fetchSpotDetails = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if (response.ok) {
    const spot = await response.json();
    dispatch(setSpotDetails(spot));
  } else {
    console.error('Failed to fetch spot details');
  }
};

export const fetchSpotReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (response.ok) {
    const data = await response.json();
    dispatch(setSpotReviews(data.Reviews));
  } else {
    console.error('Failed to fetch spot reviews');
  }
};

export const createSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(spot),
  });
  if (response.ok) {
    const newSpot = await response.json();
    dispatch(addSpot(newSpot));
  } else {
    console.error('Failed to create spot');
  }
};

export const createSpotImages = (spotId, images) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ images }),
    });

    if (response.ok) {
      const result = await response.json();
      dispatch(addSpotImages(result));
    } else {
      console.error('Failed to add spot images');
    }
  } catch (error) {
    console.error('Error adding spot images:', error);
  }
};

export const fetchSpotsByUser = () => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/current`);

  if (response.ok) {
    const data = await response.json();
    dispatch(setUserSpots(data.Spots));
  } else {
    console.error('Failed to fetch spots by user');
  }
};


export const editSpot = (spotId, spotData) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(spotData),
    });
    if (response.ok) {
      const updatedSpot = await response.json();
      dispatch(updateSpot(updatedSpot));  // Make sure this includes all needed data
      return updatedSpot;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    console.error('Failed to update spot:', error);
    throw error;
  }
};

export const deleteSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(removeSpot(spotId));
  } else {
    const errorData = await response.json();
    console.error('Failed to delete spot:', errorData.message);
  }
};

const initialState = {
  spots: [],
  currentSpot: null,
  userSpots: [],
  spotReviews: { Reviews: [] },
};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPOTS:
      return { ...state, spots: action.payload };
    case SET_SPOT_DETAILS:
      return { ...state, currentSpot: action.payload };
    case SET_SPOT_REVIEWS:
      return { ...state, spotReviews: { Reviews: action.payload } };
    case ADD_SPOT:
      return { ...state, spots: [...state.spots, action.payload] };
    case ADD_SPOT_IMAGES:
      return state;
    case SET_USER_SPOTS:
      return { ...state, userSpots: action.payload };
    case UPDATE_SPOT:
      return {...state,
        spots: state.spots.map(spot =>
        spot.id === action.payload.id ? { ...spot, ...action.payload } : spot),
        currentSpot: action.payload
      }
    case REMOVE_SPOT:
      return {
        ...state,
        spots: state.spots.filter((spot) => spot.id !== action.payload),
        userSpots: state.userSpots.filter((spot) => spot.id !== action.payload),
        currentSpot: state.currentSpot?.id === action.payload ? null : state.currentSpot
      }
    default:
      return state;
  }
};

export default spotsReducer;
