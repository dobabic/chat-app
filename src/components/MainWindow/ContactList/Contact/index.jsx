import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from 'Context/UserContext';
import './style.scss';

const defaultImage = 'https://placehold.co/200x200';

export default function Contact({
  contactId, groupId, contact, callback,
}) {
  const { currentUser } = useAuth();
  const userId = groupId || currentUser.uid;

  function handleClick(e) {
    e.preventDefault();
    callback(contactId, userId);
  }

  return (
    <NavLink
      to={`user/${contactId}`}
      className={({ isActive }) => (isActive ? 'active contact' : 'contact')}
    >
      <img
        src={defaultImage}
        alt="Contact Logo"
      />
      <span>{contact}</span>
      <button className="removeContact" type="button" onClick={handleClick}>&#x274c;</button>
    </NavLink>
  );
}
