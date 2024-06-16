import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReviews } from '../actions/reviewActions';

const ReviewsList = ({ spotId }) => {
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.reviews.reviews);

    useEffect(() => {
        dispatch(fetchReviews(spotId));
    }, [dispatch, spotId]);

    return (
        <div>
            {reviews.map((review) => (
                <div key={review.id}>{review.content}</div>
            ))}
        </div>
    );
};

export default ReviewsList;
