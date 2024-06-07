import { NavLink } from 'react-router-dom';
import { useSelector} from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
// import { ImHome } from "react-icons/im"; // possible home icon
import { GiChessPawn } from "react-icons/gi";



function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
