import { NavLink } from 'react-router-dom';
import './SpotTile.css';

const SpotTile = ({ spot }) => {
  return (
    <div className="spot-tile">
      <NavLink to={`/spots/${spot.id}`}>
        <img src={spot.previewImage} alt={spot.name} className="spot-thumbnail" />
        <div className="spot-info">
          <p>{`${spot.city}, ${spot.state}, ${spot.country}`}</p>
          <p>Rating: {spot.avgRating ? spot.avgRating.toFixed(1) : 'New'}</p>
          <p>Price: ${spot.price}</p>
        </div>
      </NavLink>
    </div>
  );
};

export default SpotTile;
