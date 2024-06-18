// src/components/ConfirmDeleteModal/ConfirmDeleteModal.jsx
import { useDispatch } from 'react-redux';
import { deleteSpot } from '../../store/spots';
import { deleteReview } from '../../store/reviews'
import './ConfirmDeleteModal.css';

const ConfirmDeleteModal = ({ type, id, spotId, closeModal }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (type === 'spot') {
      dispatch(deleteSpot(id));
    } else if (type === 'review') {
      dispatch(deleteReview(id, spotId));
    }
    closeModal();
  };

  return (
    <div className="confirm-delete-modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this {type === 'spot' ? 'spot' : 'review'}?</p>
      <button className="delete-button" onClick={handleDelete}>Yes (Delete {type === 'spot' ? 'Spot' : 'Review'})</button>
      <button className="cancel-button" onClick={closeModal}>No (Keep {type === 'spot' ? 'Spot' : 'Review'})</button>
    </div>
  );
};

export default ConfirmDeleteModal;
