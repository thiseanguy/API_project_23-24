// components/SpotDetailPage/SpotDetailPage.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotDetails, fetchSpotReviews } from '../../store/spots';
import ReviewFormModal from '../ReviewFormModal';
import { useParams } from 'react-router-dom';
import { IoStar } from "react-icons/io5";
import { BsDot } from "react-icons/bs";
import './SpotDetailPage.css';

const SpotDetailPage = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.currentSpot);
  const reviews = useSelector((state) => state.spots.spotReviews.Reviews)
  const currentUser = useSelector((state) => state.session.user);
  const [showReviewFormModal, setShowReviewFormModal] = useState(false);

  useEffect(() => {
    dispatch(fetchSpotDetails(spotId));
    dispatch(fetchSpotReviews(spotId));
  }, [dispatch, spotId]);

  const handleReserveClick = () => {
    alert("Feature coming soon");
  };

  const handlePostReviewClick = () => {
    setShowReviewFormModal(true);
  };

  const hasPostedReview = () => {
    if (!currentUser || !reviews) return false;
    return reviews.some(review => review.userId === currentUser.id);
  };

  if (!spot) {
    return <div>Loading...</div>;
  }
  const {
    name,
    city,
    state,
    country,
    previewImage,
    SpotImages = [],
    description,
    avgRating,
    price,
    Owner: owner,
  } = spot;

  const spotOwner = spot.Owner;
  const recentReviews = reviews.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));


  return (
    <div className="spot-detail-page">
      <h2>{name}</h2>
      <p>Location: {city}, {state}, {country}</p>
        <div className="spot-images">
            <div className="large-image">
                <img src={previewImage} alt={name} className="spot-thumbnail" />
            </div>
            <div className="small-images">
                {SpotImages.slice(0, 4).map((img, index) => (
                    <img key={index} src={img.url} alt={`${name} ${index + 1}`} className="spot-thumbnail-small" />
                ))}
        </div>
    </div>
    <div className="spot-details">
        <div className="spot-info">
            <p>{`Hosted by ${owner.firstName} ${owner.lastName}`}</p>
            <p>{description}</p>
        </div>
        <div className="callout-box">
            <p>Rating: {avgRating !== undefined && avgRating !== null ? avgRating.toFixed(1) : 'New'}</p>
            <p>
                Price: ${price}
            </p>
                <button className='reserve-button' onClick={handleReserveClick}>Reserve</button>
            </div>
        </div>
        <div className="spot-reviews">
          <div className='reviews-header'>
            {reviews.length > 0 ? (
              <>
              <h2 className='review-title'>
                { reviews.length === 1 ? `${reviews.length} Review` : `${reviews.length} Reviews`}
            </h2>
            <h3 className='avg-rating'>
              <IoStar className="star-icon"/>
              <BsDot className="dot-icon"/>
              {reviews.length}
            </h3>
              </>
            ) : (
              <h3>
                <IoStar className="star-icon"/>
                {` New`}
              </h3>
            )}
            {currentUser && !hasPostedReview() && (
              <button onClick={handlePostReviewClick}>Post Your Review</button>
            )}
          </div>
          {showReviewFormModal && <ReviewFormModal spotId={spotId} onClose={() => setShowReviewFormModal(false)} />}
          {reviews.length > 0 ? (
          <ul>
            {recentReviews.map((review) => {
              const reviewDate = new Date(review.createdAt);
              const formattedDate = reviewDate.toLocaleString('default', { month: 'long', year: 'numeric' });
              return (
                <li key={review.id}>
                  <p className='bold'>{review.User.firstName} - {formattedDate}</p>
                  <p>{review.review}</p>
                  <p>Rating: {review.stars}</p>
                  <p>Posted: {formattedDate}</p>
                </li>
              )
            })}
          </ul>
        ) : (
          currentUser && currentUser.id !== spotOwner.id ? (
            <p>Be the first to leave a review!</p>
          ) : (
            <p>No reviews yet.</p>
          )
        )}
      </div>
    </div>
  );
};

export default SpotDetailPage;
