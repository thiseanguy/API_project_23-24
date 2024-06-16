import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { addReview } from '../../store/reviews';

const ReviewFormModal = ({ spotId, onClose }) => {
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const dispatch = useDispatch();


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addReview(spotId, { review, stars })).then(() => {
            onClose();
          });
        };

    return (
        <form onSubmit={handleSubmit}>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review"
          required
        />
        <input
          type="number"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          placeholder="Rating (1-5)"
          min="1"
          max="5"
          required
        />
        <button type="submit">Submit Review</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    );
  };

export default ReviewFormModal;
