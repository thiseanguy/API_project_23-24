import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSpotReviews} from '../../store/spots' // Ensure deleteReview is correctly imported
// import { deleteReview } from '../../store/reviews';
import { useModal } from '../../context/Modal';
import ConfirmDeleteModal from '../ConfirmDeleteModal';
import { IoStar } from "react-icons/io5";
import { BsDot } from "react-icons/bs";
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import ReviewFormModal from '../ReviewFormModal';

const ReviewsList = ({ spotId }) => {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.spots.spotReviews.Reviews);
    const currentUser = useSelector(state => state.session.user);
    const avgRating = reviews.reduce((acc, review) => acc + review.stars, 0) / reviews.length;
    const { setModalContent } = useModal();

    useEffect(() => {
        dispatch(fetchSpotReviews(spotId));
    }, [dispatch, spotId]);

    const handleDelete = (reviewId) => {
        setModalContent(<ConfirmDeleteModal type="review" id={reviewId} spotId={spotId} closeModal={() => setModalContent(null)} />);
    };

    const handlePostReviewClick = () => {
        setModalContent(<ReviewFormModal spotId={spotId} />);
    };

    const recentReviews = reviews.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

return (
    <div className="spot-reviews">
        <div className='reviews-header'>
            {reviews.length > 0 ? (
                <>
                    <h2 className='review-title'>
                        {reviews.length === 1 ? `${reviews.length} Review` : `${reviews.length} Reviews`}
                    </h2>
                    <h3 className='avg-rating'>
                        <IoStar className="star-icon"/>
                        <BsDot className="dot-icon"/>
                        {avgRating ? avgRating.toFixed(1) : 'New'}
                    </h3>
                </>
            ) : (
                <h3>
                    <IoStar className="star-icon"/>
                    {` New `}
                </h3>
            )}
            {currentUser && currentUser.id !== (reviews[0]?.User?.id || currentUser.id) && (
                <OpenModalMenuItem
                    modalComponent={<ReviewFormModal spotId={spotId} />}
                    itemText="Post Your Review"
                    onClick={handlePostReviewClick}
                />
            )}
        </div>
        {reviews.length > 0 ? (
            <ul>
                {recentReviews.map((review) => {
                    const reviewDate = new Date(review.createdAt);
                    const formattedDate = reviewDate.toLocaleString('default', { month: 'long', year: 'numeric' });
                    return (
                        <li key={review.id}>
                            <p><strong>{review.User.firstName}</strong> - {formattedDate}</p>
                            <p>{review.review}</p>
                            <p>Rating: {review.stars}</p>
                            {currentUser && currentUser.id === review.userId && (
                                <button onClick={() => handleDelete(review.id)}>Delete</button>
                            )}
                        </li>
                    );
                })}
            </ul>
        ) : (
            <p>No reviews yet.</p>
        )}
    </div>
);
};

export default ReviewsList;
