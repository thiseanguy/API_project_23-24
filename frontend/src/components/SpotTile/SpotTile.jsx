// components/SpotTile/SpotTile.jsx
import { useModal } from '../../context/Modal'; // Assuming you have a modal context
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';
import { NavLink } from 'react-router-dom';
import './SpotTile.css';

const SpotTile = ({ spot }) => {

  const { setModalContent } = useModal();

  const openDeleteModal = () => {
    setModalContent(<ConfirmDeleteModal spotId={spot.id} closeModal={() => setModalContent(null)} />);
  };

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
      <li>
        <button onClick={openDeleteModal}>Delete</button>
        <NavLink to={`/update-spot/${spot.id}`}>Manage Spots</NavLink>
      </li>
    </div>
  );
};

export default SpotTile;
