// components/SpotsLandingPage/SpotsLandingPage.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spots'
import './SpotsLandingPage.css';

const SpotsLandingPage = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.spots);

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  if (!Array.isArray(spots)) {
    return <div>Loading...</div>;
  }

  return (
    <div className="spots-landing-page">
      <h2>All Spots</h2>
      <ul className="spot-list">
        {spots.map((spot) => (
          <li key={spot.id} className="spot-tile" title={spot.name}>
            <img src={spot.previewImage} alt={spot.name} className="spot-thumbnail" />
            <div className="spot-info">
              {/* <h3>{spot.name}</h3> */}
              <p>{spot.city}, {spot.state}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpotsLandingPage;
