// components/SpotsLandingPage/SpotsLandingPage.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spots'
import { NavLink } from 'react-router-dom';
import { Tooltip } from 'react-tooltip'
import { IoStar } from "react-icons/io5";
import './SpotsLandingPage.css';

const SpotsLandingPage = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.spots);

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  // console.log('Spots from state:', spots);

  if (!Array.isArray(spots)) {
    return <div>Loading...</div>;
  }

  return (
    <div className="spots-landing-page">
      <h2>All Spots</h2>
      <ul className="spot-list">
        {spots.map((spot) => (
          <li key={spot.id} className="spot-tile" data-tooltip-id={`tooltip-spot-tile`} data-tooltip-content={spot.name}>
              <NavLink to={`/spots/${spot.id}`} className="spot-link">
                <img src={spot.previewImage} alt={spot.name} className="spot-thumbnail" />
                <div className="spot-info">
                  <div className="spot-location-rating">
                    <p id="city-state">{spot.city}, {spot.state}</p>
                    <p id="avg-rating">
                    <IoStar className="star-icon"/>
                      {spot.avgRating !== undefined && spot.avgRating !== null
                      ? ` ${spot.avgRating.toFixed(1)}`
                      : 'New'}
                    </p>
                  </div>
                  <p>{`$${spot.price}/ night`}</p>
                </div>
                <Tooltip id={`tooltip-spot-tile`} />
              </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpotsLandingPage;
