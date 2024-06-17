// // src/store/reviews.js

import { csrfFetch } from "./csrf";
import { fetchSpotDetails } from './spots';

export const FETCH_REVIEWS = 'FETCH_REVIEWS';
export const ADD_REVIEW = 'ADD_REVIEW';

export const fetchReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const reviews = await response.json();
    dispatch({
        type: FETCH_REVIEWS,
        payload: reviews.Reviews,
    });
};

export const addReview = (spotId, review) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
    });

    if (response.ok) {
        const newReview = await response.json();
        dispatch({
            type: ADD_REVIEW,
            review: newReview,
        });

        dispatch(fetchSpotDetails(spotId));
        dispatch(fetchReviews(spotId));

        return newReview;
    } else {
        throw response;
    }
};

// const calculateAvgRating = (reviews) => {
//     if (!reviews.length) return 0;
//     const totalRating = reviews.reduce((acc, review) => acc + review.stars, 0);
//     return totalRating / reviews.length;
// };

const initialState = { spotReviews: { Reviews: [] } };

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REVIEWS:
            return { ...state, spotReviews: { Reviews: action.payload } };
        case ADD_REVIEW: {
            const updatedReviews = [action.review, ...state.spotReviews.Reviews];
            return {
                ...state,
                spotReviews: { Reviews: updatedReviews },
            };
        }
        default:
            return state;
    }
};

export default reviewsReducer;
