import { logOut } from '../../firebase-utils';
import { useAuth } from '../UserContext';
import './style.scss';

export default function LogoutButton() {
  const { setCurrentUser } = useAuth();

  function handleLogout() {
    logOut()
      .then(setCurrentUser);
  }
  return (
    <button className="Button" onClick={handleLogout}>Logout</button>
  );
}
