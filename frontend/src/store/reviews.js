// src/store/reviews.js

import { csrfFetch } from "./csrf";

export const FETCH_REVIEWS = 'FETCH_REVIEWS';
export const ADD_REVIEW = 'ADD_REVIEW';

export const fetchReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    const reviews = await response.json();
    dispatch({
        type: FETCH_REVIEWS,
        payload: reviews
    })
}

export const addReview = (spotId, review) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
    });
    const newReview = await response.json();
    dispatch({ type: ADD_REVIEW, payload: newReview });
};

const initialState = {
    reviews: [],
};

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REVIEWS:
            return { ...state, reviews: action.payload };
        case ADD_REVIEW:
            return { ...state, reviews: [...state.reviews, action.payload] };
        default:
            return state;
    }
};

export default reviewsReducer;
