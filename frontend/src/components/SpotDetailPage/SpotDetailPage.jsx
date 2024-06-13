// components/SpotDetailPage/SpotDetailPage.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotDetails, fetchSpotReviews } from '../../store/spots';
import { useParams } from 'react-router-dom';
import './SpotDetailPage.css';

const SpotDetailPage = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.currentSpot);
  const reviews = useSelector((state) => state.spots.spotReviews.Reviews)

  useEffect(() => {
    dispatch(fetchSpotDetails(spotId));
    dispatch(fetchSpotReviews(spotId));
  }, [dispatch, spotId]);

  const handleReserveClick = () => {
    alert("Feature coming soon");
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
            {owner && <p>Hosted by {owner.firstName} {owner.lastName}</p>}
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
          <h2>Reviews: {reviews.length}</h2>
          <h3>Avg Rating: {spot.avgRating}</h3>
          </div>
          {reviews.length > 0 ? (
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <p>{review.review}</p>
                <p>Rating: {review.stars}</p>
                <p>By: {review.User.firstName} {review.User.lastName}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default SpotDetailPage;
