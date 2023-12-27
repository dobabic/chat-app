import React from 'react';
import './style.scss';
import { useAuth } from 'Context/UserContext';
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
        <Tab to="/settings" imgSrc={skype} name="Settings" />
        <Tab to="/settings/account" imgSrc={skype} name="Account" />
      </div>
    </div>
  );
}