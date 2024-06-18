// components/SpotTile/SpotTile.jsx
import { useModal } from '../../context/Modal'; // Assuming you have a modal context
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';
import { NavLink } from 'react-router-dom';
import './SpotTile.css';

const SpotTile = ({ spot }) => {

  const { setModalContent } = useModal();

  const openDeleteModal = () => {
    // e.stopPropagation();
    setModalContent(<ConfirmDeleteModal spotId={spot.id} closeModal={() => setModalContent(null)} />);
  };

return (
  <div className="spot-tile">
    <NavLink to={`/spots/${spot.id}`} className="spot-link">
      <img src={spot.previewImage} alt={spot.name} className="spot-thumbnail" />
      <div className="spot-info">
        <p>Rating: {spot.avgRating ? spot.avgRating.toFixed(1) : 'New'}</p>
        <p>Price: ${spot.price}</p>
        <p>{`${spot.city}, ${spot.state}, ${spot.country}`}</p>
        <div className="spot-actions">
          <button onClick={openDeleteModal} className="spot-action-button">Delete</button>
          <NavLink to={`/update-spot/${spot.id}`} className="spot-action-button">Manage Spots</NavLink>
        </div>
      </div>
    </NavLink>
  </div>
);
}

export default SpotTile;
