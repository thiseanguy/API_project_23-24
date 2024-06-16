import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { useModal } from '../../context/Modal';
import { addReview } from '../../store/reviews';
import { IoStar } from "react-icons/io5";
import './ReviewFormModal.css';

const ReviewFormModal = ({ spotId }) => {
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const { closeModal } = useModal();


    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors({});

      if (review.length < 10) {
        setErrors({ review: 'Review must be at least 10 characters long.' });
        return;
      }

      try {
        await dispatch(addReview(spotId, { review, stars }));
        closeModal();
      } catch (err) {
        const errorResponse = await err.json();
        if (errorResponse && errorResponse.errors) {
          setErrors(errorResponse.errors);
        } else {
          setErrors({ general: 'An unexpected error occurred. Please try again.' });
        }
      }
    };

    const handleStarClick = (rating) => {
      setStars(rating);
    };

    return (
        <form onSubmit={handleSubmit} className="review-form">
        <h2>How was your stay?</h2>
        {errors.general && <p className="error">{errors.general}</p>}
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Leave your review here..."
            required
          />
          {errors.review && <p className="error">{errors.review}</p>}
          <div className="star-rating">
            <label>Stars:</label>
            <div className='stars'>
              {[1, 2, 3, 4, 5].map((star) => (
                <IoStar
                  key={star}
                  className={star <= stars ? 'star selected' : 'star'}
                  onClick={() => handleStarClick(star)}
                />
              ))}
            </div>
          </div>
          <button type="submit">Submit Review</button>
          <button type="button" onClick={closeModal}>Cancel</button>
        </form>
    );
  };

export default ReviewFormModal;
