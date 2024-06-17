// src/components/ConfirmDeleteModal/ConfirmDeleteModal.jsx
import { useDispatch } from 'react-redux';
import { deleteSpot } from '../../store/spots';
import './ConfirmDeleteModal.css';

const ConfirmDeleteModal = ({ spotId, closeModal }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteSpot(spotId));
    closeModal();
  };

  return (
    <div className="confirm-delete-modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this spot?</p>
      <button className="delete-button" onClick={handleDelete}>Yes (Delete Spot)</button>
      <button className="cancel-button" onClick={closeModal}>No (Keep Spot)</button>
    </div>
  );
};

export default ConfirmDeleteModal;
