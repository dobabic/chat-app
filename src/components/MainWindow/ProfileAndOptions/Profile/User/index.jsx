import React from 'react';
import './style.scss';
import { useAuth } from 'Context/UserContext';
import { Link } from 'react-router-dom';
import skype from 'Assets/skype.svg';
import Tab from '../../Options/Tab';

const defaultImage = 'https://placehold.co/200x200';

export default function User() {
  const { currentUser } = useAuth();

  return (
    <div className="user-container">
      <div className="user-image">
        <img src={currentUser.photoURL || defaultImage} alt="User Logo" />
      </div>
      <div className="user-info">
        <span className="user-name">{currentUser.displayName}</span>
      </div>
      <div className="links">
        <Link to="/settings">
          <Tab imgSrc={skype} name="Settings" />
        </Link>
        <Link to="/settings/account">
          <Tab imgSrc={skype} name="Account" />
        </Link>
      </div>
    </div>
  );
}
