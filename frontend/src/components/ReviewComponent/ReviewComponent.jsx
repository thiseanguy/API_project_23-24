// // src/components/ReviewComponent/ReviewComponent.jsx

// import { useSelector } from 'react-redux';
// import { useModal } from '../context/Modal';  // Assuming you have a modal context
// import ConfirmDeleteModal from './ConfirmDeleteModal/ConfirmDeleteModal';

// const ReviewComponent = ({ review, spotId }) => {
//   const currentUser = useSelector(state => state.session.user);
//   const { setModalContent } = useModal();

//   const handleDelete = () => {
//     setModalContent(<ConfirmDeleteModal type="review" id={review.id} spotId={spotId} closeModal={() => setModalContent(null)} />);
//   };

//   return (
//     <div className="review-item">
//       <p>{review.content}</p>
//       {currentUser && currentUser.id === review.userId && (
//         <button onClick={handleDelete}>Delete</button>
//       )}
//     </div>
//   );
// };

// export default ReviewComponent;
