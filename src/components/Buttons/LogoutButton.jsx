import React from 'react';
import { useAuth } from 'Context/UserContext';
import { logOut } from 'Utilities';
import './style.scss';

export default function LogoutButton() {
  const { setCurrentUser } = useAuth();

  function handleLogout() {
    logOut()
      .then(setCurrentUser);
  }
  return (
    <button type="button" className="Button" onClick={handleLogout}>Logout</button>
  );
}
