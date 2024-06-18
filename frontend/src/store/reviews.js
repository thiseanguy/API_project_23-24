// // src/store/reviews.js

import { csrfFetch } from "./csrf";
import { fetchSpotDetails } from './spots';

export const FETCH_REVIEWS = 'FETCH_REVIEWS';
export const ADD_REVIEW = 'ADD_REVIEW';
export const DELETE_REVIEW = 'DELETE_REVIEW';

export const fetchReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const reviews = await response.json();
    dispatch({
        type: FETCH_REVIEWS,
        payload: reviews.Reviews,
    });
};

export const removeReview = (reviewId) => ({
    type: DELETE_REVIEW,
    payload: reviewId,
  });


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

export const deleteReview = (reviewId, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      dispatch(removeReview(reviewId));
      dispatch(fetchSpotDetails(spotId));  // Refresh spot details to update the UI
      dispatch(fetchReviews(spotId));      // Ensure reviews list is updated
    } else {
      // handle error
      const errorData = await response.json();
      console.error('Failed to delete review:', errorData.message);
    }
  };





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
        case DELETE_REVIEW:
            return {
                ...state,
                spotReviews: {
                    Reviews: state.spotReviews.Reviews.filter((review) => review.id !== action.payload)
                }
            }
        default:
            return state;
    }
};

export default reviewsReducer;
