// components/SpotDetailPage/SpotDetailPage.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotDetails } from '../../store/spots';
import { useParams } from 'react-router-dom';
import './SpotDetailPage.css';

const SpotDetailPage = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.currentSpot);

  useEffect(() => {
    dispatch(fetchSpotDetails(spotId));
  }, [dispatch, spotId]);

  if (!spot) {
    return <div>Loading...</div>;
  }

  return (
    <div className="spot-detail-page">
      <h2>{spot.name}</h2>
      <img src={spot.previewImage} alt={spot.name} className="spot-thumbnail" />
      <p>{spot.description}</p>
      <p>{spot.city}, {spot.state}</p>
      <p>Rating: {spot.avgRating !== undefined && spot.avgRating !== null ? spot.avgRating.toFixed(1) : 'New'}</p>
      <p>Price: ${spot.price}</p>
      {/* more details as needed */}
    </div>
  );
};

export default SpotDetailPage;
