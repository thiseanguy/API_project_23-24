import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotsByUser } from '../../store/spots';
import { NavLink } from 'react-router-dom';
import SpotTile from '../SpotTile'; // Assuming you have a SpotTile component similar to the one on the landing page
import './SpotManagementPage.css';

const SpotManagementPage = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.userSpots);
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchSpotsByUser(currentUser.id));
    }
  }, [dispatch, currentUser]);

  if (!spots) {
    return <div>Loading...</div>;
  }

  return (
    <div className="spot-management-page">
      <h1>Manage Spots</h1>
      {spots.length === 0 ? (
        <div>
          <p>No spots yet.</p>
          <NavLink to="/new-spot">Create a New Spot</NavLink>
        </div>
      ) : (
        <div className="spot-tile-list">
          {spots.map((spot) => (
            <SpotTile key={spot.id} spot={spot} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SpotManagementPage;
