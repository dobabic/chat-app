import React from 'react';
import { logOut } from '../../firebase-utils';
import { useAuth } from '../../context/UserContext';
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