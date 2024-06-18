// src/components/Navigation/Navigation.jsx

import { NavLink } from 'react-router-dom';
import { useSelector} from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
// import { ImHome } from "react-icons/im"; // possible home icon
import { GiChessPawn } from "react-icons/gi";



function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className="nav-container">
      <ul className="nav-left">
        <li>
          <NavLink to="/" className='home-icon'>
            <GiChessPawn />
          </NavLink>
        </li>
        {sessionUser && (
          <li>
            <NavLink to="/spots/new" className="create-spot-button">Create a New Spot</NavLink>
          </li>
        )}
      </ul>
      {isLoaded && (
        <ul className="nav-right">
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        </ul>
      )}
    </div>
  );
}


export default Navigation;
